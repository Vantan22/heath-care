import KHAM_SUC_KHOE from "/src/assets/images/service/goi-kham-suc-khoe.png";
import DAT_LICH_KHAM from '/src/assets/images/service/dat-lich.png';
import DS_BAC_SI from '/src/assets/images/service/icon-hoi-bac-si.png';
import HEALING from "/src/assets/images/service/chua-lanh.png";
const SERVICE_VALUE = [
  {
    src :KHAM_SUC_KHOE,
    content : 'GÓI KHÁM SỨC KHOẺ',
    href : '/specialist'
  },
  {
    src :DAT_LICH_KHAM,
    content : 'ĐẶT LỊCH KHÁM',
    href : '/schedule-an-appointment'
  },
  {
    src :DS_BAC_SI,
    content : 'DANH SÁCH BÁC SĨ',
    href : '/create-medical-records'
  },
  {
    src :HEALING,
    content : 'HEALING',
    href : '/create-medical-records'
  }
]
export default SERVICE_VALUE
