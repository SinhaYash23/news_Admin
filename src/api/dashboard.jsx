export const getDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: 128,
        news: 45,
        articles: 32,
        blogs: 18,
      });
    }, 1000);
  });
};
