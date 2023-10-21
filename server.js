const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const session = require('express-session');
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Kiosk',
});

//데이터베이스 연결
connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));//여기까지 기본설정

/* 카테고리별 메뉴 범위 계산 함수 */
const calculateMenuRange = (category) => {
  let start, end;
  if (category === '1') { // 커피
    start = 100;
    end = 199;
  } else if (category === '2') { // 음료수
    start = 200;
    end = 299;
  } else if (category === '3') { // 차
    start = 300;
    end = 399;
  } else if (category === '4') { // 스무디
    start = 400;
    end = 499;
  } else if (category === '5') { // 디저트
    start = 500;
    end = 599;
  } else {
    start = 0;
    end = 0;
  }
  return { start, end };
};

/* --------------------------------------한국어------------------------------------------------- */
// 데이터베이스에서 해당 범위의 메뉴 정보 조회
app.get('/menu', (req, res) => {
  const category = req.query.category; // URL 파라미터 읽기
  getMenuDataByRange(category, (menuData) => {
    res.json(menuData);
  });
});

const getMenuDataByRange = (category, callback) => {
  const menuRange = calculateMenuRange(category);
  const sql = `SELECT menu_num, menu_name, price, menu_explan, tag, picture AS image_path 
      FROM tb_menu 
      inner join img on tb_menu.menu_num = img.img_num
      WHERE menu_num BETWEEN ? AND ?`;
  connection.query(sql, [menuRange.start, menuRange.end], (err, results) => {
    if (err) {
      console.error('Error fetching menu data:', err);
      location.alert("관리자를 호출해주세요.");
      callback([]);
      return;
    }
    callback(results);
  });
};

// 메뉴 상세 정보 조회 엔드포인트
app.get('/menu/:menuId', (req, res) => {//09.29 전체 수정!!!!!!!!!!
  const menuId = req.params.menuId;

  // 메뉴 정보를 가져오는 쿼리
  const getMenuQuery = `
    SELECT menu_name, price, menu_explan, tag
    FROM tb_menu
    WHERE menu_num = ?`;

  // 이미지 정보를 가져오는 쿼리
  const getImagePathQuery = `
    SELECT picture
    FROM img
    WHERE img_num = ?`;

  // 알레르기 정보를 가져오는 쿼리
  const getAllegyQuery = `
    SELECT allegy_name
    FROM tb_allegy
    INNER JOIN tb_menu_allegy ON tb_allegy.allegy_num = tb_menu_allegy.allegy_num
    WHERE tb_menu_allegy.menu_num = ?`;

  // 옵션 정보를 가져오는 쿼리
  const getOptionQuery = `
    SELECT op_name, op_price
    FROM tb_op
    INNER JOIN tb_menu_op ON tb_op.op_num = tb_menu_op.op_num
    WHERE tb_menu_op.menu_num = ?`;

  // 주문 정보를 가져오는 쿼리
  const getOrderQuery = `
    SELECT *
    FROM tb_order
    WHERE menu_num = ?`;

  connection.query(getMenuQuery, [menuId], (err, menuResults) => {
    if (err) {
      console.error('메뉴 데이터 조회 오류:', err);
      return;
    }

    connection.query(getImagePathQuery, [menuId], (err, imageResults) => {
      if (err) {
        console.error('이미지 데이터 조회 오류:', err);
        return;
      }

      const imagePath = imageResults[0] ? imageResults[0].picture : null;
      if (!imagePath) {
        console.error('이미지 경로를 찾을 수 없습니다.');
        return;
      }

      connection.query(getAllegyQuery, [menuId], (err, allegyResults) => {
        if (err) {
          console.error('알레르기 데이터 조회 오류:', err);
          return;
        }

        const allegyNames = [...new Set(allegyResults.map(result => result.allegy_name))];

        connection.query(getOptionQuery, [menuId], (err, optionResults) => {
          if (err) {
            console.error('옵션 데이터 조회 오류:', err);
            return;
          }

          const optionData = optionResults.map(result => ({
            op_name: result.op_name,
            op_price: result.op_price
          }));

          // 주문 정보를 가져옵니다.
          connection.query(getOrderQuery, [menuId], (err, orderResults) => {
            if (err) {
              console.error('주문 데이터 조회 오류:', err);
              return;
            }

            // 주문 데이터를 배열로 만듭니다.
            const orders = orderResults.map(order => ({
              order_num: order.order_num,
              menu_num: order.menu_num,
              count: order.count,
              op_t: order.op_t,
              op_s: order.op_s,
              op1: order.op1,
              op2: order.op2,
              op3: order.op3,
              op4: order.op4,
              op5: order.op5,
              op6: order.op6,
              op7: order.op7,
              op8: order.op8
            }));

            console.log('메뉴 데이터:', menuResults[0]);

            const menuData = {
              menuData: menuResults[0],
              allegy_names: allegyNames,
              image_path: imagePath,
              op_data: optionData,
              orders: orders  // 주문 데이터를 추가합니다.
            };

            res.json(menuData);
          });
        });
      });
    });
  });
});

//08.20 checklist에서 보는 detail내용과 변경사항 db에 저장
app.get('/order/:orderNum', (req, res) => {
  const orderNum = req.params.orderNum;

  const getOrderQuery = `
    SELECT o.*, m.menu_name, m.price AS menu_price, m.menu_explan, i.picture
    FROM tb_order o
    INNER JOIN tb_menu m ON o.menu_num = m.menu_num
    INNER JOIN img i ON o.menu_num = i.img_num
    WHERE o.order_num = ?`;

  const getOrderAllergyQuery = `
    SELECT a.allegy_name
    FROM tb_allegy a
    INNER JOIN tb_menu_allegy ma ON a.allegy_num = ma.allegy_num
    WHERE ma.menu_num = ?`;

  const getOptionQuery = `
    SELECT op.op_name, op.op_price
    FROM tb_op op
    WHERE op.op_num IN (?, ?, ?, ?, ?, ?, ?, ?)`;

  const getMenuOpQuery = `
    SELECT mo.op_num
    FROM tb_menu_op mo
    WHERE mo.menu_num = (SELECT menu_num FROM tb_order WHERE order_num = ?)`;

  connection.query(getOrderQuery, [orderNum], (err, orderResults) => {
    if (err) {
      console.error('Error fetching order data:', err);
      res.status(500).json({ error: 'Error fetching order data' });
      return;
    }

    if (orderResults.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const orderData = orderResults[0];

    const opNumbers = [orderData.op1, orderData.op2, orderData.op3, orderData.op4,
    orderData.op5, orderData.op6, orderData.op7, orderData.op8];

    connection.query(getOrderAllergyQuery, [orderData.menu_num], (err, allergyResults) => {
      if (err) {
        console.error('Error fetching order allergy data:', err);
        res.status(500).json({ error: 'Error fetching order allergy data' });
        return;
      }

      connection.query(getMenuOpQuery, [orderData.order_num], (err, menuOpResults) => {
        if (err) {
          console.error('Error fetching menu_op data:', err);
          res.status(500).json({ error: 'Error fetching menu_op data' });
          return;
        }

        const opNumbersFromMenuOp = menuOpResults.map(result => result.op_num);

        // 'op_num'을 주문 정보에서 가져온 'opNumbers'와 'opNumbersFromMenuOp'에서 모두 가져와 배열에 저장합니다.
        const combinedOpNumbers = [...opNumbers, ...opNumbersFromMenuOp].filter(op => op !== 0);

        // 옵션 데이터를 가져오는 부분을 500번대 메뉴인 경우에만 실행하도록 수정
        if (orderData.menu_num >= 100 && orderData.menu_num < 500) {
          connection.query(getOptionQuery, combinedOpNumbers, (err, optionResults) => {
            if (err) {
              console.error('Error fetching option data:', err);
              res.status(500).json({ error: 'Error fetching option data' });
              return;
            }

            const allergyNames = [...new Set(allergyResults.map(result => result.allegy_name))];
            // 'op_num'을 배열 형태로 추가합니다.
            orderData.op_num = combinedOpNumbers;
            orderData.allergy_names = allergyNames;
            orderData.option_data = optionResults;

            res.json(orderData);
          });
        } else {
          // 500번대 메뉴인 경우에는 옵션 데이터를 가져오지 않고 바로 응답으로 전송
          const allergyNames = [...new Set(allergyResults.map(result => result.allegy_name))];
          orderData.op_num = [];
          orderData.allergy_names = allergyNames;
          orderData.option_data = [];
          res.json(orderData);
        }
      });
    });
  });
});

//detail_menu에서의 변경 내용은 db에 저장
app.post("/addOrder", (req, res) => {
  const {
    menu_num, count, op_t, op_s, op1, op2, op3, op4, op5, op6, op7, op8, } = req.body;

  // INSERT 문 작성 및 실행
  const insertOrderQuery = `
    INSERT INTO tb_order (menu_num, count, op_t, op_s, op1, op2, op3, op4, op5, op6, op7, op8)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    insertOrderQuery,
    [
      menu_num, count, op_t, op_s, op1, op2, op3, op4, op5, op6, op7, op8,],
    (err, result) => {
      if (err) {
        console.error("Error inserting order data:", err);
        res.status(500).json({ error: "Error inserting order data" });
        return;
      } else {
        console.log('데이터 추가 성공:', result);
      }
      // 성공적으로 추가되었다는 응답 전송
      res.json({ success: true });
    }
  );
});//detail_menu.js끝

//detail_menu_o에서의 변경 내용 db에 저장
app.post("/updateOrder", (req, res) => {
  const { orderNum, newData } = req.body;

  // SQL 쿼리 작성
  const sql = `
    UPDATE tb_order
    SET count = ?, op_t = ?, op_s = ?, op1 = ?, op2 = ?, op3 = ?, op4 = ?, op5 = ?, op6 = ?, op7 = ?, op8 = ?
    WHERE order_num = ?;
  `;

  const values = [
    newData.count,
    newData.op_t,
    newData.op_s,
    newData.op1,
    newData.op2,
    newData.op3,
    newData.op4,
    newData.op5,
    newData.op6,
    newData.op7,
    newData.op8,
    orderNum
  ];

  // SQL 쿼리 실행
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error updating order:", error);
      res.json({ success: false, message: "주문 정보 업데이트 중 오류가 발생했습니다." });
    } else {
      console.log("Order updated successfully:", results);
      res.json({ success: true, message: "주문 정보가 업데이트되었습니다." });
    }
  });
});

// DELETE 요청을 처리하는 API 엔드포인트
app.delete('/deleteOrder/:orderNum', (req, res) => {
  const orderNum = req.params.orderNum;

  const deleteQuery = 'DELETE FROM tb_order WHERE order_num = ?';

  connection.query(deleteQuery, [orderNum], (err, result) => {
    if (err) {
      console.error('Error deleting order:', err);
      res.status(500).json({ error: 'Error deleting order' });
    } else {
      console.log('Order deleted successfully');
      res.json({ message: 'Order deleted successfully' });
    }
  });
});

// 클라이언트에 주문 데이터 제공하는 API 엔드포인트
app.get('/getOrderData', (req, res) => {
  // getOrderData 함수를 이용하여 데이터를 가져와서 클라이언트로 전송
  getOrderData((orderData) => {
    res.json(orderData);
  });
});

// getOrderData 함수 내에서 사용할 데이터 가져오는 코드 추가
const getOrderData = (callback) => {
  const sql1 = `
  SELECT tb_order.*, tb_menu.menu_name, tb_menu.price
  FROM tb_order
  JOIN tb_menu ON tb_order.menu_num = tb_menu.menu_num
  `;

  const sql2 = `
  SELECT img.picture, tb_order.count, tb_menu.price
  FROM img
  INNER JOIN tb_order ON img.img_num = tb_order.menu_num
  INNER JOIN tb_menu ON tb_order.menu_num = tb_menu.Menu_Num
  `;

  //08.20 옵션에 표기된 내용 추가
  const getOptionQuery = `
  SELECT op.op_name, op.op_price
  FROM tb_op op
  WHERE op.op_num IN (?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql1, (err, results1) => {
    if (err) {
      console.error('Error fetching order data:', err);
      callback([]);
      return;
    }

    connection.query(sql2, (err, results2) => {
      if (err) {
        console.error('Error fetching image data:', err);
        callback([]);
        return;
      }

      const combinedResults = results1.map((order, index) => ({
        ...order,
        imagePath: results2[index].picture,
      }));

      const orderPromises = combinedResults.map(order => new Promise((resolve, reject) => {
        const opNumbers = [order.op_s, order.op1, order.op2, order.op3, order.op4,//10.08수정
        order.op5, order.op6, order.op7, order.op8];
        connection.query(getOptionQuery, opNumbers, (err, optionResults) => {
          if (err) {
            reject(err);
            return;
          }
          const processedOrder = {
            ...order,
            options: optionResults,
          };
          resolve(processedOrder);
        });
      }));

      Promise.all(orderPromises)
        .then(processedResults => {
          const finalResults = processedResults.map(order => {
            // 주문의 가격과 수량을 곱한 기본 total_price 계산
            let total_price = Number(order.price) * Number(order.count);
            // 옵션들의 op_price를 더하여 total_price에 추가
            order.options.forEach(option => {
              total_price += Number(option.op_price) * Number(order.count);
            });
            return {
              ...order,
              total_price,
            };
          });

          callback(finalResults);
        })
        .catch(error => {
          console.error('Error fetching option data:', error);
          callback([]);
        });
    });
  });
};

//검색 쿼리(한국어)
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;

  const sql = `select * from img inner join tb_menu
  on img.img_num = tb_menu.Menu_Num
  where tb_menu.Menu_Name LIKE '%${keyword}%'`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

/* --------------------------------------영어------------------------------------------------- */
app.get('/menu_e', (req, res) => {
  const category = req.query.category; // URL 파라미터 읽기
  getMenuDataByRange_e(category, (menuData) => {
    res.json(menuData);
  });
});

const getMenuDataByRange_e = (category, callback) => {
  const menuRange = calculateMenuRange(category);
  const sql = `SELECT menu_num, menu_name, price, menu_explan, tag, picture AS image_path 
      FROM tb_menu_e
      inner join img on tb_menu_e.menu_num = img.img_num
      WHERE menu_num BETWEEN ? AND ?`;
  connection.query(sql, [menuRange.start, menuRange.end], (err, results) => {
    if (err) {
      console.error('Error fetching menu data:', err);
      location.alert("Please call the administrator.");
      callback([]);
      return;
    }
    callback(results);
  });
};

// 메뉴 상세 정보 조회 엔드포인트
app.get('/menu_e/:menuId', (req, res) => {
  const menuId = req.params.menuId;
  console.log(menuId);

  // 메뉴 정보를 가져오는 쿼리
  const getMenuQuery = `
    SELECT menu_name, price, menu_explan, tag
    FROM tb_menu_e
    WHERE menu_num = ?`;

  // 이미지 정보를 가져오는 쿼리
  const getImagePathQuery = `
    SELECT picture
    FROM img
    WHERE img_num = ?`;

  // 알레르기 정보를 가져오는 쿼리
  const getAllegyQuery = `
    SELECT allegy_name
    FROM tb_allegy_e
    INNER JOIN tb_menu_allegy_e ON tb_allegy_e.allegy_num = tb_menu_allegy_e.allegy_num
    WHERE tb_menu_allegy_e.menu_num = ?`;

  // 옵션 정보를 가져오는 쿼리
  const getOptionQuery = `
    SELECT op_name, op_price
    FROM tb_op_e
    INNER JOIN tb_menu_op_e ON tb_op_e.op_num = tb_menu_op_e.op_num
    WHERE tb_menu_op_e.menu_num = ?`;

  // 주문 정보를 가져오는 쿼리
  const getOrderQuery = `
    SELECT *
    FROM tb_order
    WHERE menu_num = ?`;

  connection.query(getMenuQuery, [menuId], (err, menuResults) => {
    if (err) {
      console.error('메뉴 데이터 조회 오류:', err);
      return;
    }

    connection.query(getImagePathQuery, [menuId], (err, imageResults) => {
      if (err) {
        console.error('이미지 데이터 조회 오류:', err);
        return;
      }

      const imagePath = imageResults[0] ? imageResults[0].picture : null;
      if (!imagePath) {
        console.error('이미지 경로를 찾을 수 없습니다.');
        return;
      }

      connection.query(getAllegyQuery, [menuId], (err, allegyResults) => {
        if (err) {
          console.error('알레르기 데이터 조회 오류:', err);
          return;
        }

        const allegyNames = [...new Set(allegyResults.map(result => result.allegy_name))];

        connection.query(getOptionQuery, [menuId], (err, optionResults) => {
          if (err) {
            console.error('옵션 데이터 조회 오류:', err);
            return;
          }

          const optionData = optionResults.map(result => ({
            op_name: result.op_name,
            op_price: result.op_price
          }));

          // 주문 정보를 가져옵니다.
          connection.query(getOrderQuery, [menuId], (err, orderResults) => {
            if (err) {
              console.error('주문 데이터 조회 오류:', err);
              return;
            }

            // 주문 데이터를 배열로 만듭니다.
            const orders = orderResults.map(order => ({
              order_num: order.order_num,
              menu_num: order.menu_num,
              count: order.count,
              op_t: order.op_t,
              op_s: order.op_s,
              op1: order.op1,
              op2: order.op2,
              op3: order.op3,
              op4: order.op4,
              op5: order.op5,
              op6: order.op6,
              op7: order.op7,
              op8: order.op8
            }));

            console.log('메뉴 데이터:', menuResults[0]);

            const menuData = {
              menuData: menuResults[0],
              allegy_names: allegyNames,
              image_path: imagePath,
              op_data: optionData,
              orders: orders
            };
            res.json(menuData);
          });
        });
      });
    });
  });
});

//08.20 checklist에서 보는 detail내용과 변경사항 db에 저장
app.get('/order_e/:orderNum', (req, res) => {
  const orderNum = req.params.orderNum;

  const getOrderQuery = `
    SELECT o.*, m.menu_name, m.price AS menu_price, m.menu_explan, i.picture
    FROM tb_order o
    INNER JOIN tb_menu_e m ON o.menu_num = m.menu_num
    INNER JOIN img i ON o.menu_num = i.img_num
    WHERE o.order_num = ?`;

  const getOrderAllergyQuery = `
    SELECT a.allegy_name
    FROM tb_allegy_e a
    INNER JOIN tb_menu_allegy_e ma ON a.allegy_num = ma.allegy_num
    WHERE ma.menu_num = ?`;

  const getOptionQuery = `
    SELECT op.op_name, op.op_price
    FROM tb_op_e op
    WHERE op.op_num IN (?, ?, ?, ?, ?, ?, ?, ?)`;

  const getMenuOpQuery = `
    SELECT mo.op_num
    FROM tb_menu_op_e mo
    WHERE mo.menu_num = (SELECT menu_num FROM tb_order WHERE order_num = ?)`;

  connection.query(getOrderQuery, [orderNum], (err, orderResults) => {
    if (err) {
      console.error('Error fetching order data:', err);
      res.status(500).json({ error: 'Error fetching order data' });
      return;
    }

    if (orderResults.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const orderData = orderResults[0];

    const opNumbers = [orderData.op1, orderData.op2, orderData.op3, orderData.op4,
    orderData.op5, orderData.op6, orderData.op7, orderData.op8];

    connection.query(getOrderAllergyQuery, [orderData.menu_num], (err, allergyResults) => {
      if (err) {
        console.error('Error fetching order allergy data:', err);
        res.status(500).json({ error: 'Error fetching order allergy data' });
        return;
      }
      //09.10수정
      connection.query(getMenuOpQuery, [orderData.order_num], (err, menuOpResults) => {
        if (err) {
          console.error('Error fetching menu_op data:', err);
          res.status(500).json({ error: 'Error fetching menu_op data' });
          return;
        }

        const opNumbersFromMenuOp = menuOpResults.map(result => result.op_num);

        // 'op_num'을 주문 정보에서 가져온 'opNumbers'와 'opNumbersFromMenuOp'에서 모두 가져와 배열에 저장합니다.
        const combinedOpNumbers = [...opNumbers, ...opNumbersFromMenuOp].filter(op => op !== 0);

        // 옵션 데이터를 가져오는 부분을 500번대 메뉴인 경우에만 실행하도록 수정

        if (orderData.menu_num >= 100 && orderData.menu_num < 500) {
          connection.query(getOptionQuery, combinedOpNumbers, (err, optionResults) => {
            if (err) {
              console.error('Error fetching option data:', err);
              res.status(500).json({ error: 'Error fetching option data' });
              return;
            }

            const allergyNames = [...new Set(allergyResults.map(result => result.allegy_name))];
            // 'op_num'을 배열 형태로 추가합니다.
            orderData.op_num = combinedOpNumbers;
            orderData.allergy_names = allergyNames;
            orderData.option_data = optionResults;

            res.json(orderData);
          });
        } else {
          // 500번대 메뉴인 경우에는 옵션 데이터를 가져오지 않고 바로 응답으로 전송
          const allergyNames = [...new Set(allergyResults.map(result => result.allegy_name))];
          orderData.op_num = [];
          orderData.allergy_names = allergyNames;
          orderData.option_data = [];
          res.json(orderData);
        }
      });//09.10여기까지
    });
  });
});

//detail_menu에서의 변경 내용은 db에 저장
app.post("/addOrder_e", (req, res) => {
  const {
    menu_num, count, op_t, op_s, op1, op2, op3, op4, op5, op6, op7, op8, } = req.body;

  // INSERT 문 작성 및 실행
  const insertOrderQuery = `
    INSERT INTO tb_order (menu_num, count, op_t, op_s, op1, op2, op3, op4, op5, op6, op7, op8)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    insertOrderQuery,
    [
      menu_num, count, op_t, op_s, op1, op2, op3, op4, op5, op6, op7, op8,],
    (err, result) => {
      if (err) {
        console.error("Error inserting order data:", err);
        res.status(500).json({ error: "Error inserting order data" });
        return;
      } else {
        console.log('데이터 추가 성공:', result);
      }
      // 성공적으로 추가되었다는 응답 전송
      res.json({ success: true });
    }
  );
});//detail_menu.js끝

//detail_menu_o에서의 변경 내용 db에 저장
app.post("/updateOrder_e", (req, res) => {
  const { orderNum, newData } = req.body;

  // SQL 쿼리 작성
  const sql = `
    UPDATE tb_order
    SET count = ?, op_t = ?, op_s = ?, op1 = ?, op2 = ?, op3 = ?, op4 = ?, op5 = ?, op6 = ?, op7 = ?, op8 = ?
    WHERE order_num = ?;
  `;
  const values = [
    newData.count,
    newData.op_t,
    newData.op_s,
    newData.op1,
    newData.op2,
    newData.op3,
    newData.op4,
    newData.op5,
    newData.op6,
    newData.op7,
    newData.op8,
    orderNum
  ];
  // SQL 쿼리 실행
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error updating order:", error);
      res.json({ success: false, message: "주문 정보 업데이트 중 오류가 발생했습니다." });
    } else {
      console.log("Order updated successfully:", results);
      res.json({ success: true, message: "주문 정보가 업데이트되었습니다." });
    }
  });
});//08.20 추가 끝

// DELETE 요청을 처리하는 API 엔드포인트
app.delete('/deleteOrder/:orderNum', (req, res) => {
  const orderNum = req.params.orderNum;

  const deleteQuery = 'DELETE FROM tb_order WHERE order_num = ?';

  connection.query(deleteQuery, [orderNum], (err, result) => {
    if (err) {
      console.error('Error deleting order:', err);
      res.status(500).json({ error: 'Error deleting order' });
    } else {
      console.log('Order deleted successfully');
      res.json({ message: 'Order deleted successfully' });
    }
  });
});

// 클라이언트에 주문 데이터 제공하는 API 엔드포인트
app.get('/getOrderData_e', (req, res) => {
  // getOrderData 함수를 이용하여 데이터를 가져와서 클라이언트로 전송
  getOrderData_e((orderData) => {
    res.json(orderData);
  });
});

// getOrderData 함수 내에서 사용할 데이터 가져오는 코드 추가
const getOrderData_e = (callback) => {
  const sql1 = `
  SELECT tb_order.*, tb_menu_e.menu_name, tb_menu_e.price
  FROM tb_order
  JOIN tb_menu_e ON tb_order.menu_num = tb_menu_e.menu_num
  `;

  const sql2 = `
  SELECT img.picture, tb_order.count, tb_menu_e.price
  FROM img
  INNER JOIN tb_order ON img.img_num = tb_order.menu_num
  INNER JOIN tb_menu_e ON tb_order.menu_num = tb_menu_e.Menu_Num
  `;

  //08.20 옵션에 표기된 내용 추가
  const getOptionQuery = `
  SELECT op.op_name, op.op_price
  FROM tb_op_e op
  WHERE op.op_num IN (?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql1, (err, results1) => {
    if (err) {
      console.error('Error fetching order data:', err);
      callback([]);
      return;
    }

    connection.query(sql2, (err, results2) => {
      if (err) {
        console.error('Error fetching image data:', err);
        callback([]);
        return;
      }

      const combinedResults = results1.map((order, index) => ({
        ...order,
        imagePath: results2[index].picture,
      }));

      const orderPromises = combinedResults.map(order => new Promise((resolve, reject) => {
        const opNumbers = [order.op_s, order.op1, order.op2, order.op3, order.op4,
        order.op5, order.op6, order.op7, order.op8];
        connection.query(getOptionQuery, opNumbers, (err, optionResults) => {
          if (err) {
            reject(err);
            return;
          }
          const processedOrder = {
            ...order,
            options: optionResults,
          };
          resolve(processedOrder);
        });
      }));

      Promise.all(orderPromises)
        .then(processedResults => {
          const finalResults = processedResults.map(order => {
            // 주문의 가격과 수량을 곱한 기본 total_price 계산
            let total_price = Number(order.price) * Number(order.count);
            // 옵션들의 op_price를 더하여 total_price에 추가
            order.options.forEach(option => {
              total_price += Number(option.op_price) * Number(order.count);
            });
            return {
              ...order,
              total_price,
            };
          });

          callback(finalResults);
        })
        .catch(error => {
          console.error('Error fetching option data:', error);
          callback([]);
        });
    });
  });
};

//검색 쿼리(영어)
app.get('/search_e', (req, res) => {
  const keyword_e = req.query.keyword;

  const sql = `select * from img inner join tb_menu_e
  on img.img_num = tb_menu_e.Menu_Num
  where tb_menu_e.Menu_Name LIKE '%${keyword_e}%'`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

//동일 옵션시 갯수만 수정
app.post("/updateCount/:orderNum", (req, res) => {
  const orderNum = req.params.orderNum;
  const { count } = req.body;

  // SQL 쿼리 작성
  const sql = `
    UPDATE tb_order
    SET count = ?
    WHERE order_num = ?;
  `;

  const values = [count, orderNum];

  // SQL 쿼리 실행
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error updating order:", error);
      res.json({ success: false, message: "갯수 정보 업데이트 중 오류가 발생했습니다." });
    } else {
      console.log("Order updated successfully:", results);
      res.json({ success: true, message: "갯수 정보가 업데이트되었습니다." });
    }
  });
});

// 09.04추가 selectorder.html 로딩시 tb_order초기화
app.post("/reset", (req, res) => {
  // 주문 데이터를 삭제하기 위한 DELETE 쿼리
  const deleteOrderQuery = `DELETE FROM tb_order`;
  console.log(`삭제 진행됨`);
  // 초기화 작업을 위한 ALTER TABLE 쿼리
  const alterTableQuery = `ALTER TABLE tb_order AUTO_INCREMENT = 1`;

  // DELETE 쿼리 실행
  connection.query(deleteOrderQuery, (err, deleteResult) => {
    if (err) {
      console.error("Error initializing data:", err);
      res.status(500).json({ error: "Error initializing data" });
      return;
    }

    // ALTER TABLE 쿼리 실행
    connection.query(alterTableQuery, (err, alterResult) => {
      if (err) {
        console.error("Error initializing data:", err);
        res.status(500).json({ error: "Error initializing data" });
        return;
      }

      res.json({ message: "Data initialized successfully" });
    });
  });
});//tb_order 초기화 끝

//기본 설정
app.get('/detail_menu.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/detail_menu.js');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
