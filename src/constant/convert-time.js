export const convertAppointmentTime = (appointmentTime) => {
  const date = new Date(appointmentTime);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0 nên cộng thêm 1
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}/${month}/${year}`;
}
export  const convertTimeAndDate = (appointmentTime) => {
  const date = new Date(appointmentTime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0 nên cộng thêm 1
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}/${month}/${year} : ${hours}h : ${minutes}m`
}
