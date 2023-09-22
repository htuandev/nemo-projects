class SweetAlert {
    position = "center";
    icon = "success";
    title = "Successful";
    text = "";
    showConfirmButton = false;
    showCancelButton = false;
    timer = 2000;
  }

  export class SweetAlertFailure extends SweetAlert {
    icon = "error";
    title = "Failure";
  }

  export class SweetAlertSuccessful extends SweetAlert {
    icon = "success";
    title = "Successful";
  }