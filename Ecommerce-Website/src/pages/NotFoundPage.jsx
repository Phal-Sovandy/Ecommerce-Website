import { useEffect } from "react";
function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found!";
  });
  return <></>;
}

export default NotFoundPage;
