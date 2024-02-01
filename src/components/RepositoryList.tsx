import React, { useState } from "react";
import Nav from "./Nav";
import List from "./List";
import ListItem from "./ListItem";
import { Repository } from "./interfaces";

interface RepositoryListProps {
  repos: Repository[];
  handleUpdateRepos: (updatedRepos: Repository[]) => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  repos,
  handleUpdateRepos,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onDragStart = (event: React.DragEvent<HTMLElement>, index: number) => {
    event.dataTransfer.setData("draggedItemIndex", String(index));
    setDraggedIndex(Number(index));
  };

  const onDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  const onDrop = (event: React.DragEvent<HTMLElement>, dropIndex: number) => {
    event.preventDefault();
    const draggedItemIndex = Number(
      event.dataTransfer.getData("draggedItemIndex")
    );
    const draggedItem = repos[draggedItemIndex];
    const updatedRepos = [...repos];
    updatedRepos.splice(draggedItemIndex, 1);
    updatedRepos.splice(dropIndex, 0, draggedItem);

    handleUpdateRepos(updatedRepos);
  };

  return (
    <div className="divide-y divide-slate-100">
      <Nav>
        <dl>Repositórios</dl>
      </Nav>
      <List>
        {repos.map((repo, index) => (
          <li
            key={repo.id}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDrop={(e) => onDrop(e, index)}
            className={`odd:bg-gray-100 even:bg-white p-4 border-b border-gray-100 cursor-move ${
              draggedIndex === index ? "bg-gray-100" : ""
            }`}
          >
            <ListItem key={repo.id} repo={repo} />
          </li>
        ))}
      </List>
    </div>
  );
};

export default RepositoryList;
