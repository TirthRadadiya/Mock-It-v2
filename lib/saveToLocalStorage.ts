'use client';

export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, data);
};
