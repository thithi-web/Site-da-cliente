Swal.fire({
    title: "<strong>HTML <u>example</u></strong>",
    icon: "info",
    html: `
      You can use <b>bold text</b>,
      <a href="#" autofocus>links</a>,
      and other HTML tags
    `,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
      👍 Great!
    `,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `
      👎
    `,
    cancelButtonAriaLabel: "Thumbs down"
  });

  alert("olá") = 