const { createApp } = require('./app');
const PORT = process.env.PORT || 5000;

createApp('./recruit_direct.db').then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
