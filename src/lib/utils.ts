export const cx = (...classNames: unknown[]) =>
  classNames.filter(Boolean).join(' ');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const myLoader = ({ src }: any) => {
  return src;
};

// display numbers with comma (form string)
export const displayNumbers = (num: number): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function createDeletePostHandler<T extends { id: string }>(
  setPosts: React.Dispatch<React.SetStateAction<T[]>>
) {
  return (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };
}