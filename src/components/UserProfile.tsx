import React, { useCallback, useEffect, useState } from "react";
import { fetchRepositories, fetchUser } from "../services/api";
import { useParams } from "react-router-dom";
import RepositoryList from "./RepositoryList";
import Pagination from "./Pagination";
import Loading from "./Loading";
import { Repository, User } from "./interfaces";
import { CONSTANTS } from "./enums";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>();
  const [currentRepos, setCurrentRepos] = useState<Repository[]>([]);
  const [allRepos, setAllRepos] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState(CONSTANTS.CURRENT_PAGE);
  const [reposPerPage] = useState(CONSTANTS.REPOS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(CONSTANTS.TOTAL_PAGES);
  const [totalRepos, setTotalRepos] = useState(CONSTANTS.TOTAL_REPOS);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        const userData = await fetchUser(username);
        setUser(userData);
      };

      fetchData();
    }
  }, [username]);

  const handleGetAllRepos = useCallback(async () => {
    if (username) {
      const perPage = 100;
      const condition = true;
      let allRepos: Repository[] = [];
      let page = 1;

      while (condition) {
        const repos = await fetchRepositories(username, perPage, page);
        if (repos.length === 0) break;

        allRepos = [...allRepos, ...repos];
        page++;

        if (repos.length < perPage) break;
      }
      return allRepos;
    }
  }, [username]);

  useEffect(() => {
    const fetchRepos = async () => {
      if (username && user) {
        setTotalPages(Math.ceil(user.public_repos / reposPerPage));
        setTotalRepos(user.public_repos);

        const allRepos = await handleGetAllRepos();
        setAllRepos(
          allRepos?.sort((a, b) => b.stargazers_count - a.stargazers_count) ||
            []
        );
      }
    };
    fetchRepos();
  }, [handleGetAllRepos, reposPerPage, user, username]);

  useEffect(() => {
    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos: Repository[] = allRepos.slice(
      indexOfFirstRepo,
      indexOfLastRepo
    );
    setCurrentRepos(currentRepos);
  }, [allRepos, currentPage, reposPerPage]);

  const changePage = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    event.preventDefault();
    setCurrentPage(() => page);
  };

  const nextPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const nextLastPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrentPage(totalPages);
  };

  const prevPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  };

  const prevFirstPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  const handleUpdateRepos = (updatedRepos: Repository[]): void => {
    setCurrentRepos(updatedRepos);
  };

  if (!currentRepos.length) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-50">
      <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 rounded-full"
              src={user?.avatar_url}
              alt={user?.name}
            />
            <div>
              <div className="font-bold text-xl">{user?.name}</div>
              <div className="text-gray-600">@{user?.login}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-bold">Bio:</div>
            <p>{user?.bio}</p>
          </div>
          <div className="mt-4">
            <div className="font-bold">Seguidores:</div>
            <p>{user?.followers}</p>
          </div>
          <div className="mt-4">
            <div className="font-bold">Seguindo:</div>
            <p>{user?.following}</p>
          </div>
        </div>
        <RepositoryList
          repos={currentRepos}
          handleUpdateRepos={handleUpdateRepos}
        />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6 rounded-lg">
        <Pagination
          totalPages={totalPages}
          totalRepos={totalRepos}
          currentPage={currentPage}
          changePage={changePage}
          prevPage={prevPage}
          prevFirstPage={prevFirstPage}
          nextPage={nextPage}
          nextLastPage={nextLastPage}
          existNext={currentRepos.length >= CONSTANTS.REPOS_PER_PAGE}
          existPrev={currentPage > CONSTANTS.CURRENT_PAGE}
        />
      </div>
    </div>
  );
};

export default UserProfile;
