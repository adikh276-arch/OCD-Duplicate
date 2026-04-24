export interface Trigger {
  name: string;
  emoji: string;
  category: 'places' | 'situations' | 'people';
  rating: number;
}

export type CategoryKey = 'places' | 'situations' | 'people';

export interface CategoryConfig {
  key: CategoryKey;
  label: string;
  emoji: string;
  suggestions: { emoji: string; name: string }[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'places',
    label: 'Places',
    emoji: '📍',
    suggestions: [
      { emoji: '🚽', name: 'Public toilet' },
      { emoji: '🏥', name: 'Hospital' },
      { emoji: '🛒', name: 'Market' },
      { emoji: '🏋️', name: 'Gym' },
      { emoji: '🚌', name: 'Public transport' },
      { emoji: '🏠', name: "Someone's home" },
    ],
  },
  {
    key: 'situations',
    label: 'Situations',
    emoji: '🔄',
    suggestions: [
      { emoji: '🚪', name: 'Door handles' },
      { emoji: '💰', name: 'Handling money' },
      { emoji: '🤝', name: 'Shaking hands' },
      { emoji: '📱', name: 'Touching phone' },
      { emoji: '🧴', name: 'Shared equipment' },
    ],
  },
  {
    key: 'people',
    label: 'People',
    emoji: '👤',
    suggestions: [
      { emoji: '🤧', name: 'Sick people' },
      { emoji: '👥', name: 'Crowded spaces' },
      { emoji: '👶', name: 'Children' },
      { emoji: '🧍', name: 'Strangers' },
      { emoji: '😷', name: 'Anyone who coughs' },
    ],
  },
];
