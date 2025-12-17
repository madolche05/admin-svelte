import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: postsData, error } = await supabase
        .from('posts')
        .select(
            `
            title,
            slug,
            excerpt,
            content,
            published_at,
            created_at,
            featured_image,
            author:author_id ( full_name )
        `
        )
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return { posts: [] };
    }

    // Process posts to ensure excerpt exists
    const posts = postsData.map(post => {
        if (!post.excerpt && post.content) {
            // Simple markdown stripping (remove #, *, etc) and truncation
            const plainText = post.content
                .replace(/[#*`\[\]()]/g, '') // Remove common markdown chars
                .replace(/\n+/g, ' ')        // Replace newlines with spaces
                .trim();
            
            post.excerpt = plainText.length > 150 
                ? plainText.substring(0, 150) + '...' 
                : plainText;
        }
        // Remove content from the list view payload to save bandwidth/memory if needed
        // (optional, but good practice if content is large)
        const { content, ...rest } = post; 
        // We actually return 'rest' but we need to assign the new excerpt to it.
        // Since 'post' is a reference, modifying it modifies the object.
        // But we are destructuring 'content' out.
        return { ...rest, excerpt: post.excerpt };
    });

    return { posts };
};
