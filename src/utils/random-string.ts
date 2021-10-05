export const randomString = (length: number) => [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('')

export const generateSlug = (word: string): string => word.split(' ').map(w => w.charAt(0) + w.substring(1)).join('-')
