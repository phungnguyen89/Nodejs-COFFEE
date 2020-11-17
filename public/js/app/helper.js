function clearMsg(element) {
    document.getElementById("error_msg").style.display = "none";
    document.getElementById("success_msg").style.display = "none";
    document.getElementById("error_msg").innerText = "";
    document.getElementById("success_msg").innerText = "";
  }
  function msg(str, err = false) {
    clearMsg();
    let msg = err
      ? document.getElementById("error_msg")
      : document.getElementById("success_msg");
    msg.style.display = "block";
    msg.innerText = str;
  }