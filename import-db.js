const fs = require('fs');
const mysql = require('mysql2/promise');

async function importSql() {
  const connection = await mysql.createConnection({
    host: 'tokaido.proxy.rlwy.net',
    port: 43816,
    user: 'root',
    password: 'aHYGZxywKNJpBNemDRWedYeHvxrfNWBz', // Railway Variables 탭의 MYSQL_ROOT_PASSWORD 값을 여기에 넣으세요!
    database: 'railway',
    multipleStatements: true
  });

  console.log('🔗 Railway 데이터베이스 연결 성공!');

  const sqlFilePath = './eum_telecom_db.sql';
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

  console.log('⏳ .sql 파일 업로드 및 실행 중...');
  await connection.query(sqlContent);
  console.log('🎉 데이터베이스 마이그레이션 완료!');

  await connection.end();
}

importSql().catch((err) => {
  console.error('❌ 에러 발생:', err);
});