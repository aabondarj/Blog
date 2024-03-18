class BlogService {
  static async getArticles(limit: number, offset: number) {
    const response = await fetch(`https://blog.kata.academy/api/articles??limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  }

  static async getArticle(slug: string) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return response.json();
  }


  static async registerUser(data: any) {
    console.log(data);
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: data })
    });
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return await response.json();
  }

  static async loginUser(data: any) {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: data })
    });
    if (!response.ok) {
      throw new Error('Failed to login user');
    }
    return await response.json();
  }

  static async updateUser(data: any) {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ user: data })
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return await response.json();
  }

  static async logoutUser() {
    localStorage.removeItem('accessToken');
    return Promise.resolve();
  }

  static async getUserData() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch('https://blog.kata.academy/api/user', {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json();
  }

  static async toggleArticleFavorite(slug: string) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to toggle article favorite');
    }

    const data = await response.json();
    return data.article;
  }

  static async removeArticleFavorite(slug: string) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove article favorite');
    }

    const data = await response.json();
    return data.article;
  }
  static async createArticle(articleData: any) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      throw new Error('Failed to create article');
    }

    const createdArticle = await response.json();
    return createdArticle;
  }

  static async updateArticle(articleData: any, slug: string) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      throw new Error('Failed to update article');
    }

    const updatedArticle = await response.json();
    return updatedArticle;
  }
  
  static async deleteArticle(slug: string) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete article');
    }

    return await response.json();
  }
}

export default BlogService;