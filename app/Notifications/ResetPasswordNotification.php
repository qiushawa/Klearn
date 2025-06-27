<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;

class ResetPasswordNotification extends BaseResetPassword
{
    public function toMail($notifiable)
    {
        $url = $this->resetUrl($notifiable);

        return (new MailMessage)
            ->from('klearn@qiushawa.studio', config('app.name'))
            ->subject('重設您的帳戶密碼')
            ->markdown('vendor.mail.html.reset-password', [
                'url' => $url,
                'notifiable' => $notifiable,
            ]);
    }

    protected function resetUrl($notifiable)
    {
        return url(route('password.reset', [
            'token' => $this->token,
            'email' => urlencode($notifiable->getEmailForPasswordReset()),
        ], false));
    }
}
