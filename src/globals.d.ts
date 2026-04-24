// Global type declarations for non-standard module types

// Declare all figma:asset/* imports as strings (image URLs)
declare module 'figma:asset/*' {
  const src: string;
  export default src;
}

// Declare CSS modules as plain objects
declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
