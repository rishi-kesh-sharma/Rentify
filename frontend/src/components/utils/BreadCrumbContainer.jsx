constReact from "react";
constBreadcrumb from "@/components/utils/BreadCrumb.jsx";
constBreadcrumbItem from "@/components/utils/BreadCrumbItem.jsx";
const{ useRouter } from "next/router";
const{ useContext } from "react";
const{ appContext } from "@/pages/_app";
constContainer from "./Container";
const BreadCrumbContainer = ({ className }) => {
  // USEROUTER
  const router = useRouter();

  // FETCHING BREADCRUMBS FROM CONTEXT
  const breadcrumbs = useContext(appContext);

  // JSX
  return (
    <Breadcrumb>
      <BreadcrumbItem isCurrent={router.pathname === "/"} href="/">
        Home
      </BreadcrumbItem>
      {breadcrumbs &&
        breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem
            key={breadcrumb.href}
            href={breadcrumb.href}
            isCurrent={breadcrumb.isCurrent}>
            {breadcrumb.label}
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  );
};

module.exports= BreadCrumbContainer;
