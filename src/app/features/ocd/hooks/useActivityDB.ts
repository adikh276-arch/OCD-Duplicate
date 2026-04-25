import { useState, useCallback } from 'react';

/**
 * Hook for managing activity data persistence.
 * Currently uses fetch to MantraCare central API (standardized persistence layer).
 */
export const useActivityDB = (activitySlug: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = sessionStorage.getItem('user_id');

  const executeQuery = useCallback(async (action: string, payload: any) => {
    if (!userId) {
      console.warn('ActivityDB: No user_id found in session.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // This is the standardized MantraCare Persistence API endpoint
      const response = await fetch('https://api.mantracare.com/ocd_selfcare/persistence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          userId,
          activity: activitySlug,
          action,
          payload
        })
      });

      if (!response.ok) throw new Error('Persistence failed');
      
      const result = await response.json();
      return result.data;
    } catch (err: any) {
      console.error(`ActivityDB Error [${activitySlug}]:`, err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [activitySlug, userId]);

  return { executeQuery, loading, error };
};
