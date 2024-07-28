const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.get("/todos", () => {
    res.json([
        { id: 1, title: "Learn Node.js" },
        { id: 2, title: "Learn Express.js" },
        { id: 3, title: "Learn MongoDB" }
    ]);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);