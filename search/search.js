/** simple-keyboard 키보드 **/
$(document).ready(function () {
    const Keyboard = window.SimpleKeyboard.default;
    const KeyboardLayouts = window.SimpleKeyboardLayouts.default;

    const layout = new KeyboardLayouts().get("korean");
    // const normalizedCandidate = selectedCandidate.normalize("NFD"); 

    const myKeyboard = new Keyboard({
        onChange: input => onChange(input),
        onKeyPress: button => onKeyPress(button),
        ...layout

    });

    let name1NFC;

    function onChange(input) {
        document.querySelector(".input").value = input;
        console.log("Input changed", input);
        name1NFC = input.normalize('NFC');
    }

    function onKeyPress(button) {
        console.log("Button pressed", button);

        if (button === "{enter}") {
            search(name1NFC);
            location.reload();
        }
    }

    document.getElementById("search_icon").addEventListener("click", function () {
        search(name1NFC);
        location.reload();
    })
});

// 서버 URL 설정 (서버 주소와 포트에 맞게 변경)
//const serverUrl = 'http://localhost:3001';

function search() {
    const searchInput = document.getElementById('input_menu_name').value;

    // 검색어가 비어있지 않을 경우에만 서버로 요청 전송
    if (searchInput.trim() !== '') {
        fetch(`http://localhost:3001/search?keyword=${encodeURIComponent(searchInput)}`)
            .then(response => response.json())
            .then(data => {
                const resultContainer = document.getElementById('resultContainer');
                resultContainer.innerHTML = ''; // 이전 결과 초기화

                if (data.length === 0) {
                    resultContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
                } else {
                    data.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'box list_content_box';
                        div.id = 'list_click';
                        div.innerHTML = `
                              <div class="box list_img_box">
                                  <img class="list_img_size" src=".${item.Picture}">
                              </div>
                              <div class="box list_content_info">
                                  <div class=" container text-center">
                                      <div class="content_title">
                                          <div class="menu_name">${item.Menu_Name}</div>
                                          <div class="menu_cost">${item.Price}원</div>
                                      </div>
                                  </div>
                              </div>
                          `;
                        resultContainer.appendChild(div);
                        //console.log("Menu Name: ", item.Menu_Name);
                        //console.log("Menu Price: ", item.Price);
                    });
                }

                // const searchResult = encodeURIComponent(JSON.stringify(data));
                localStorage.setItem('mydata', JSON.stringify(data));
                //console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

function search(searchInput) {
    // const searchInput = document.getElementById('input_menu_name').value;
    // 검색어가 비어있지 않을 경우에만 서버로 요청 전송
    if (searchInput !== '') {
        fetch(`http://localhost:3001/search?keyword=${encodeURIComponent(searchInput)}`)
            .then(response => response.json())
            .then(data => {
                const resultContainer = document.getElementById('resultContainer');
                resultContainer.innerHTML = ''; // 이전 결과 초기화

                if (data.length === 0) {
                    resultContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
                    localStorage.setItem('mydata', '없음'); // '없음' 문자열 저장
                } else {
                    data.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'box list_content_box';
                        div.id = 'list_click';
                        div.innerHTML = `
                              <div class="box list_img_box">
                                  <img class="list_img_size" src=".${item.Picture}">
                              </div>
                              <div class="box list_content_info">
                                  <div class=" container text-center">
                                      <div class="content_title">
                                          <div class="menu_name">${item.Menu_Name}</div>
                                          <div class="menu_cost">${item.Price}원</div>
                                      </div>
                                  </div>
                              </div>
                          `;
                        resultContainer.appendChild(div);
                        //console.log("Menu Name: ", item.Menu_Name);
                        //console.log("Menu Price: ", item.Price);
                    });
                }

                // const searchResult = encodeURIComponent(JSON.stringify(data));
                localStorage.setItem('mydata', JSON.stringify(data));
                //console.log(data);
                localStorage.setItem('searchInput', searchInput);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

// Enter 키 입력 시 search 함수 호출
document.getElementById('input_menu_name').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // 기본 제출 동작 막기
        search(); // 검색 함수 호출
        location.reload(); //페이지 새로고침/
    }
});


function handleKeywordClick() {
    const keyword = document.querySelectorAll(".keyword");

    keyword.forEach(item => {
        item.addEventListener('click', function () {
            const keyword_value = item.textContent;
            search(keyword_value);
            localStorage.setItem('searchInput', keyword_value);
            location.reload();
        })
    })
}

function modal_display() {
    const all_modal = document.querySelector('.modal');
    all_modal.computedStyleMap.display = 'flex';
} 

handleKeywordClick(); // 함수 호출

// 모달 배경을 클릭했을 때와 모달 닫기 버튼 클릭 시
document.querySelector('.modal').addEventListener('click', function (event) {
    if (event.target === this || event.target.classList.contains("close_btn")) {
        // 모달을 닫기
        $('#exampleModal').modal('hide');

        // 페이지 새로고침
        location.reload();
    }
});



