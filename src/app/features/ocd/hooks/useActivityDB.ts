import { useState, useCallback } from 'react';
import { getStoredUserId } from '../utils/cookieAuth';

/**
 * Hook for managing activity data persistence.
 * Currently uses fetch to MantraCare central API (standardized persistence layer).
 */
export const useActivityDB = (activitySlug: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeQuery = useCallback(async (action: string, payload: any) => {
    const currentUserId = getStoredUserId();
    const currentToken = sessionStorage.getItem('token');

    if (!currentUserId) {
      console.error(`ActivityDB Error [${activitySlug}]: No user identity found.`);
      setError('Identity not found');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // This is the standardized MantraCare Persistence API endpoint
      const response = await fetch('/ocd_selfcare/api/persistence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken || ''}`
        },
        body: JSON.stringify({
          userId: currentUserId,
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
  }, [activitySlug]);

  return { executeQuery, loading, error };
};
