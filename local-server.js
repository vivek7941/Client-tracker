const app = require('./api/index.js');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Local Server running on http://localhost:${PORT}`);
});
