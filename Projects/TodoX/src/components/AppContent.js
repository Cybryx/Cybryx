import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';
import { SelectButton } from './Button';
import testUsers from './Test-Users';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function updateFilter(value) {
  if (value !== 'null') {
    fetch(`/db/${value}`)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        window.localStorage.setItem('todoList', JSON.stringify(data));
        toast.success(`Logged In as ${value}!`);
        // Store the fetched data in a state variable
        window.location.reload();
      })
      .catch((error) => {
        toast.error(`Error fetching data: ${error}`);
      });
  }
}

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const [fetchedData, setFetchedData] = useState([]);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  const handleFilterChange = useCallback((event) => {
    updateFilter(event.target.value, setFetchedData);
  }, []);

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            // <motion.div key={todo.id} variants={child}>
            <TodoItem key={todo.id} todo={todo} />
            // </motion.div>
          ))
        ) : (
          <>
            <motion.p variants={child} className={styles.emptyText}>
              Nothing to do... go kys
            </motion.p>
            <SelectButton
              id="status"
              onChange={handleFilterChange}
              value={filterStatus}
              className="sync"
            >
              <option value="null">Load from Server</option>
              {testUsers.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </SelectButton>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
