/** simple-keyboard 키보드 **/
$(document).ready(function () {
    const Keyboard = window.SimpleKeyboard.default;

    // const normalizedCandidate = selectedCandidate.normalize("NFD"); 

    const myKeyboard = new Keyboard({
        onChange: input => onChange(input),
        onKeyPress: button => onKeyPress(button),
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
        fetch(`http://localhost:3001/search_e?keyword=${encodeURIComponent(searchInput)}`)
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
        fetch(`http://localhost:3001/search_e?keyword=${encodeURIComponent(searchInput)}`)
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
document.getElementById('input_menu_name').addEventListener('keypress', function(event) {
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

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var diagnosticPara = document.querySelector('.output_text');

// 나중 파일에서 수정한 코드
if (typeof modifiedSpeechResult === 'undefined') {
    modifiedSpeechResult = ""; // 새로운 변수로 선언
  }

function sendSpeech() {
    var recognition = new SpeechRecognition();
    // var speechRecognitionList = new SpeechGrammarList();
    // recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US'; // 영어 언어 설정
    recognition.interimResults = false; // true: 중간 결과를 반환, false: 최종 결과만 반환
    recognition.continious = false; // true: 음성인식을 계속해서 수행, false: 음성인식을 한번만 수행
    recognition.maxAlternatives = 5000;

    recognition.start(); // 음성인식 시작

    recognition.onstart = function () {
        var buttonElement = document.querySelector('.mike_box');
        var speech_result = document.querySelector('.output_text');
        if (buttonElement) {
            buttonElement.style.borderColor = "#007AC2";
            buttonElement.style.borderWidth = "15px";

            speech_result.textContent = "Voice recognition is in progress."

            speech_result.style.color = "black";
        }
    };

    recognition.onresult = function (event) {
        var speechResult = event.results[0][0].transcript; // trim()을 사용하여 앞뒤 공백 제거
        console.log('Confidence: ' + event.results[0][0].confidence);   //인식 확신 수준 출력
        // 0은 불확실한 인식    1은 확실한 인식
        console.log('Speech Result: ' + speechResult);
        // 마침표를 제거하고 수정된 문자열 출력

        // console.log('Speech Result: ' + speechResult);

        modifiedSpeechResult = speechResult.replace(/\./g, ''); // 모든 마침표 제거
        console.log(modifiedSpeechResult);
        diagnosticPara.textContent = 'Voice Recognition Results: ' + modifiedSpeechResult;

        recognition.onend = function () {
            var buttonElement = document.querySelector('.mike_box');
            var speech_result = document.querySelector('.output_text');
            var speech_search_btn = document.querySelector('.speech_result_box button');

            if (buttonElement) {
                buttonElement.style.borderColor = "black";
                buttonElement.style.borderWidth = "2px";

                speech_result.style.color = "#FF991B";
                speech_search_btn.style.display = "block";

            }
        };
        // localStorage.setItem('speech_result', modifiedSpeechResult);
    }
}

function search_go() {
    search(modifiedSpeechResult);
    location.reload();
}