/* FILE: script.js */
// --- 重要 ---
// GASのデプロイ時にコピーしたウェブアプリのURLをここに貼り付けてください
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzLWo-wYVy57wDsltTvWrm9d-Os2dLAqP4KH3g-0OVsgEVhx39e_BUOw-SXSkTI5inv/exec';
// ------------

const form = document.getElementById('inquiryForm');
const submitButton = document.getElementById('submitForm');
const customAlert = document.getElementById('customAlert');
const customAlertMessage = document.getElementById('customAlertMessage');
const customAlertClose = document.getElementById('customAlertClose');
const customAlertOverlay = document.getElementById('customAlertOverlay');

// カスタムアラートを表示する関数
function showAlert(message) {
    customAlertMessage.textContent = message;
    customAlert.classList.remove('hidden');
    customAlertOverlay.classList.remove('hidden');
}

// アラートを閉じるためのイベントリスナー
customAlertClose.addEventListener('click', function() {
    customAlert.classList.add('hidden');
    customAlertOverlay.classList.add('hidden');
});

// フォーム送信時のイベントリスナー
form.addEventListener('submit', function(e) {
    e.preventDefault(); // デフォルトのフォーム送信をキャンセル

    // 同意チェックボックスの確認
    if (document.getElementById('agreeCheckbox') && !document.getElementById('agreeCheckbox').checked) {
        showAlert('プライバシーポリシーに同意してください。');
        return; // 同意していない場合は処理を中断
    }

    submitButton.disabled = true;
    submitButton.textContent = '送信中...';

    // フォームデータをオブジェクトとして収集
    const formData = {
        inquiryType: document.getElementById('inquiryType').value,
        fullName: document.getElementById('fullName').value,
        furigana: document.getElementById('furigana').value,
        companyName: document.getElementById('companyName').value,
        departmentName: document.getElementById('departmentName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        detailType: document.getElementById('detailType').value,
        message: document.getElementById('message').value,
        secret: '8qZ$p#vT2@nK*wG7hB5!sF8aU'
    };

    // fetch APIを使用してGASにデータを送信
    fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            // 成功した場合、サンクスページに移動
            window.location.href = 'thankyou.html';
        } else {
            // スクリプトからエラーが返された場合
            showAlert('送信に失敗しました: ' + data.message);
            submitButton.disabled = false;
            submitButton.textContent = '上記に同意して送信';
        }
    })
    .catch(error => {
        // ネットワークエラーなどが発生した場合
        console.error('Error:', error);
        showAlert('送信中にエラーが発生しました。');
        submitButton.disabled = false;
        submitButton.textContent = '上記に同意して送信';
    });
});
