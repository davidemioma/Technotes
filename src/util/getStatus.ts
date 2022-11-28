export const getStatus = (roles: string[] | undefined) => {
  let status = "Employee";

  if (roles?.includes("Manager") && roles?.includes("Admin")) {
    status = "Manager";
  } else if (roles?.includes("Manager")) {
    status = "Manager";
  } else if (roles?.includes("Admin")) {
    status = "Admin";
  } else {
    status = "Employee";
  }

  return status;
};
