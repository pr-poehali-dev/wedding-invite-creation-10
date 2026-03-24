"""
Обработка RSVP-формы: отправка уведомлений о подтверждении гостей на почту и в Telegram.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import urllib.request


def send_email(name: str, guests: str, comment: str):
    gmail_user = "pcelinakristina433@gmail.com"
    gmail_password = os.environ["GMAIL_APP_PASSWORD"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"💌 Новый ответ на приглашение — {name}"
    msg["From"] = gmail_user
    msg["To"] = gmail_user

    text = f"""Новый ответ на свадебное приглашение!

Имя: {name}
Количество гостей: {guests}
Пожелания по алкоголю: {comment or "не указано"}
"""

    html = f"""
<html><body style="font-family: Georgia, serif; color: #5a4a42; background: #fff8f5; padding: 24px;">
  <h2 style="color: #c9a0a0;">💌 Новый ответ на приглашение</h2>
  <table style="margin-top: 16px;">
    <tr><td style="padding: 6px 16px 6px 0; font-weight: bold;">Имя:</td><td>{name}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: bold;">Гостей:</td><td>{guests}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: bold;">Пожелания по алкоголю:</td><td>{comment or "не указано"}</td></tr>
  </table>
</body></html>
"""
    msg.attach(MIMEText(text, "plain", "utf-8"))
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, gmail_user, msg.as_string())


def send_telegram(name: str, guests: str, comment: str):
    token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]

    text = (
        f"💌 *Новый ответ на приглашение*\n\n"
        f"👤 *Имя:* {name}\n"
        f"👥 *Гостей:* {guests}\n"
        f"🍾 *Пожелания по алкоголю:* {comment or 'не указано'}"
    )

    data = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }).encode("utf-8")

    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    urllib.request.urlopen(req, timeout=10)


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    guests = body.get("guests", "1")
    comment = body.get("comment", "").strip()

    if not name:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Имя обязательно"}, ensure_ascii=False)}

    errors = []
    try:
        send_email(name, guests, comment)
    except Exception as e:
        errors.append(f"email: {e}")

    try:
        send_telegram(name, guests, comment)
    except Exception as e:
        errors.append(f"telegram: {e}")

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "errors": errors})
    }