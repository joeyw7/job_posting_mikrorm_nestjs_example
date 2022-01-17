const mockCommitEntry = (username: string, email: string) => {
  return {
    commit: {
      author: {
        name: 'cptera',
        email: 'cptera@users.noreply.github.com',
      },
    },
    author: {
      login: 'cptera',
    },
  };
};
