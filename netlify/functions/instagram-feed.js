const GRAPH_API = 'https://graph.facebook.com';
const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';

exports.handler = async () => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  const version = process.env.META_GRAPH_API_VERSION;
  const hashtag = (process.env.INSTAGRAM_HASHTAG || 'RioBurgers').replace(/^#/, '').trim();

  if (!token || !userId || !version) {
    return json(200, { configured: false, posts: [] }, 'public, max-age=60');
  }

  try {
    const hashtagSearch = await graphRequest(version, '/ig_hashtag_search', {
      user_id: userId,
      q: hashtag,
      access_token: token,
    });
    const hashtagId = hashtagSearch.data?.[0]?.id;

    const requests = [
      graphRequest(version, `/${encodeURIComponent(userId)}/tags`, {
        fields: FIELDS,
        limit: '12',
        access_token: token,
      }),
    ];

    if (hashtagId) {
      requests.push(graphRequest(version, `/${encodeURIComponent(hashtagId)}/recent_media`, {
        user_id: userId,
        fields: FIELDS,
        limit: '12',
        access_token: token,
      }));
    }

    const results = await Promise.all(requests);
    const unique = new Map();
    for (const media of results.flatMap(result => result.data || [])) {
      if (!media.id || !media.permalink) continue;
      unique.set(media.id, {
        id: media.id,
        caption: media.caption || '',
        mediaUrl: media.media_type === 'VIDEO' ? (media.thumbnail_url || media.media_url) : media.media_url,
        permalink: media.permalink,
        timestamp: media.timestamp || '',
      });
    }

    const posts = [...unique.values()]
      .filter(media => media.mediaUrl)
      .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
      .slice(0, 8);

    return json(200, { configured: true, posts }, 'public, max-age=300, s-maxage=300');
  } catch (error) {
    console.error('Instagram feed request failed:', error.message);
    return json(502, { configured: true, posts: [], error: 'instagram_unavailable' }, 'no-store');
  }
};

async function graphRequest(version, path, params) {
  const url = new URL(`${GRAPH_API}/${encodeURIComponent(version)}${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || `Meta Graph API returned ${response.status}`);
  }
  return data;
}

function json(statusCode, body, cacheControl) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cacheControl,
    },
    body: JSON.stringify(body),
  };
}
