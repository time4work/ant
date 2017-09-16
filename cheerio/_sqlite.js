var sqlite3 = require('sqlite3').verbose();

// ...тот же код, что и в примере выше

function done(){
    var db = new sqlite3.Database('data.sqlite');
    db.serialize(function(){
        db.run('DROP TABLE IF EXISTS data');
        db.run('CREATE TABLE data (url TEXT, name TEXT, price TEXT)');
        var stmt = db.prepare('INSERT INTO data VALUES (?, ?, ?)');
        for (var i = 0; i < results.length; i++) {
            stmt.run(results[i]);
        };
        stmt.finalize();
        db.close();
    });
}