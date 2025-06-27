@component('mail::message')
# 重設您的密碼

您好，{{ $notifiable->name ?? '用戶' }}！

我們收到了您帳戶的密碼重置請求。請點擊下面的按鈕來設置您的新密碼：

@component('mail::button', ['url' => $url])
立即重設密碼
@endcomponent

此鏈接將在 **60 分鐘** 後失效。如果您沒有發起這個請求，請忽略此郵件或聯繫我們的支援團隊：support@yourdomain.com。

感謝您使用我們的服務！

{{ config('app.name') }} 團隊
@endcomponent
