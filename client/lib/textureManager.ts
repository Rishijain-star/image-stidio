export interface Texture {
  id: string;
  name: string;
  url: string;
  previewUrl: string;
  category: string;
}

// Local texture storage for MVP (can be replaced with Firebase)
const LOCAL_TEXTURES: Texture[] = [
  {
    id: "texture-1",
    name: "Wood Grain",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cdefs%3E%3ClinearGradient id='woodGradient' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%238B6F47;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23A0826D;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238B6F47;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='256' height='256' fill='url(%23woodGradient)'/%3E%3Cpath d='M 0 20 Q 64 25 128 20 T 256 20' stroke='%23654321' stroke-width='2' fill='none' opacity='0.3'/%3E%3Cpath d='M 0 80 Q 64 85 128 80 T 256 80' stroke='%23654321' stroke-width='2' fill='none' opacity='0.2'/%3E%3Cpath d='M 0 140 Q 64 145 128 140 T 256 140' stroke='%23654321' stroke-width='2' fill='none' opacity='0.3'/%3E%3Cpath d='M 0 200 Q 64 205 128 200 T 256 200' stroke='%23654321' stroke-width='2' fill='none' opacity='0.2'/%3E%3C/svg%3E",
    previewUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3ClinearGradient id='woodGradient' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%238B6F47;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23A0826D;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238B6F47;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23woodGradient)'/%3E%3Cpath d='M 0 20 Q 25 22 50 20 T 100 20' stroke='%23654321' stroke-width='1' fill='none' opacity='0.3'/%3E%3C/svg%3E",
    category: "natural"
  },
  {
    id: "texture-2",
    name: "Marble",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cdefs%3E%3ClinearGradient id='marbleGradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23E8E8E8;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23D0D0D0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23E8E8E8;stop-opacity:1' /%3E%3C/linearGradient%3E%3Cfilter id='marbleNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' /%3E%3C/filter%3E%3C/defs%3E%3Crect width='256' height='256' fill='url(%23marbleGradient)' filter='url(%23marbleNoise)' opacity='0.5'/%3E%3Crect width='256' height='256' fill='url(%23marbleGradient)'/%3E%3C/svg%3E",
    previewUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3ClinearGradient id='marbleGradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23E8E8E8;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23D0D0D0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23E8E8E8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23marbleGradient)'/%3E%3C/svg%3E",
    category: "stone"
  }
];

export const getAvailableTextures = async (): Promise<Texture[]> => {
  return LOCAL_TEXTURES;
};

export const getTextureById = async (id: string): Promise<Texture | null> => {
  return LOCAL_TEXTURES.find(t => t.id === id) || null;
};

export const addLocalTexture = (texture: Texture) => {
  LOCAL_TEXTURES.push(texture);
};

export const updateLocalTexture = (id: string, updates: Partial<Texture>) => {
  const index = LOCAL_TEXTURES.findIndex(t => t.id === id);
  if (index !== -1) {
    LOCAL_TEXTURES[index] = { ...LOCAL_TEXTURES[index], ...updates };
  }
};

export const deleteLocalTexture = (id: string) => {
  const index = LOCAL_TEXTURES.findIndex(t => t.id === id);
  if (index !== -1) {
    LOCAL_TEXTURES.splice(index, 1);
  }
};
