import { PrismaClient } from '@prisma/client';

import uploadFile from './cloudinaryService';

const prisma = new PrismaClient();

export const getPostsWithUsers = async (
  start: number,
  userId: string,
  feedType: 'feed' | 'explore'
) => {
  const isFeed = feedType === 'feed';
  console.log('working');
  const posts = await prisma.post.findMany({
    take: 50,
    orderBy: { date: 'desc' },
    where: isFeed
      ? {
          author: {
            followers: {
              none: {
                followerUserId: userId, // Check if the current user follows this author
              },
            },
          },
        }
      : {}, // If feedType is not 'feed', return all posts
    select: {
      id: true,
      image_url: true,
      content: true,
      date: true,
      likeCount: true,
      commentCount: true,
      likes: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  if (!posts || posts.length === 0) {
    console.log('No posts found');
    return [];
  }
  const postsWithIsLiked = posts.map(({ likes, ...post }) => ({
    ...post,
    isLiked: likes.length > 0,
  }));
  const paginated = postsWithIsLiked.slice(start, start + 5);

  console.log('Fetched posts:', paginated);

  return paginated;
};
export const deletePost = async (id, authorId, userId) => {
  if (authorId !== userId) {
    throw new Error("Unauthorized to delete this post");
  }

  const deleted = await prisma.post.delete({
    where: { id }
  });
console.log("post has been deleted",id)
  return deleted;
};
export const getUserLikedPosts = async (profileId: string, userId: string) => {
  const likedPosts = await prisma.post.findMany({
    orderBy: { date: 'desc' },
    where: {
      authorId: profileId,
      likes: {
        some: {
          user_id: userId,
        },
      },
    },
    select: {
      id: true,
      image_url: true,
      content: true,
      date: true,
      likeCount: true,
      commentCount: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      likes: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });
  if (!likedPosts || likedPosts.length === 0) {
    console.log('No posts found');
    return [];
  }
  const updatedPosts = likedPosts.map(({ likes, ...post }) => ({
    ...post,
    isLiked: likes.length > 0,
  }));
  return updatedPosts;
};
export const getUserPosts = async (
  start: number,
  userId: string,
  authorId: string
) => {
  console.log('working', userId, authorId, start);
  const posts = await prisma.post.findMany({
    orderBy: { date: 'desc' },
    where: {
      authorId,
    },
    select: {
      id: true,
      image_url: true,
      content: true,
      date: true,
      likeCount: true,
      commentCount: true,
      likes: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  if (!posts || posts.length === 0) {
    console.log('No posts found');
    return [];
  }
  const postsWithIsLiked = posts.map(({ likes, ...post }) => ({
    ...post,
    isLiked: likes.length > 0,
  }));
  console.log('Fetched posts:', postsWithIsLiked);

  return postsWithIsLiked;
};
export const createPost = async ({
  content,
  file,
  authorId,
}: {
  content: string;
  file: File | null;
  authorId: string;
}) => {
  let cloudinaryResponse = null;
  console.log(file);
  if (file && file.size > 0) {
    cloudinaryResponse = await uploadFile(file);
  }
  return prisma.post.create({
    data: {
      content,
      image_url: cloudinaryResponse ? cloudinaryResponse.secure_url : null,
      authorId,
    },
  });
};

export const handleLikePrisma = async ({ id, userId }) => {
  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        user_id: userId,
        post_id: id,
      },
    });
    console.log(existingLike);
    if (!existingLike) {
      return prisma.$transaction([
        prisma.like.create({
          data: {
            post_id: id,
            user_id: userId,
          },
        }),
        prisma.post.update({
          where: { id },
          data: { likeCount: { increment: 1 } },
        }),
      ]);
    }
    return prisma.$transaction([
      prisma.like.deleteMany({
        where: { post_id: id, user_id: userId },
      }),
      prisma.post.update({
        where: { id },
        data: { likeCount: { decrement: 1 } },
      }),
    ]);
  } catch (error) {
    throw new Error('Failed to like the post.');
  }
};
// Single post operations:
export const getPost = async ({ id, userId }) => {
  const post = await prisma.post.findFirst({
    where: { id },
    select: {
      id: true,
      image_url: true,
      content: true,
      date: true,
      likeCount: true,
      commentCount: true,
      likes: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  const postWithIsLiked = {
    ...post,
    isLiked: post.likes.length > 0,
  };
  console.log('fetches signle post:', postWithIsLiked);
  return postWithIsLiked;
};
export const editPost = ({
  id,
  content,
  image_url,
  authorId,
}: {
  id: string;
  date: Date;
  content: string;
  image_url: string;
  authorId: string;
}) => {
  return prisma.post.updateMany({
    where: {
      AND: [{ id }, { authorId }],
    },
    data: {
      content,
      image_url,
    },
  });
};

// export const unlikePost = async(post_id: string, user_id: string)
const postFromFollowing = async (start: number, userId: string) => {
  return prisma.post.findMany({
    take: 5,
    skip: start,
    orderBy: { date: 'desc' },
    where: {
      author: {
        followers: {
          some: {
            userId,
          },
        },
      },
    },
    select: {
      id: true,
      image_url: true,
      content: true,
      date: true,
      likeCount: true,
      commentCount: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};
export const handleCommentLikePrisma = async ({ id, userId }) => {
  try {
    const existingLike = await prisma.commentLike.findFirst({
      where: {
        userId,
        commentId: id,
      },
    });
    console.log(existingLike);
    if (!existingLike) {
      return prisma.$transaction([
        prisma.commentLike.create({
          data: {
            userId,
            commentId: id,
          },
        }),
        prisma.comment.update({
          where: { id },
          data: { commentLikesCount: { increment: 1 } },
        }),
      ]);
    }
    return prisma.$transaction([
      prisma.commentLike.deleteMany({
        where: { commentId: id, userId },
      }),
      prisma.comment.update({
        where: { id },
        data: { commentLikesCount: { decrement: 1 } },
      }),
    ]);
  } catch (error) {
    throw new Error('Failed to like the post.');
  }
};
