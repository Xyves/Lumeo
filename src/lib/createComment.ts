export async function createCommentApi({
  id,
  content,
  image_url,
  authorId,
}: {
  id: string;
  content: string;
  image_url?: string;
  authorId: string;
}) {
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, content, image_url, authorId }),
    });
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Error creating comment');
  }
}
