const BASE_URL = 'https://api.github.com/users/';

export const fetchUser = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}${username}`);
    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchTotalData = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}${username}`);
    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchRepositories = async (username: string,reposPerPage: number,currentPage: number) => {
  try {
    const response = await fetch(`${BASE_URL}${username}/repos?per_page=${reposPerPage}&page=${currentPage}`);
    if (!response.ok) {
      throw new Error('Repositórios não encontrados');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
