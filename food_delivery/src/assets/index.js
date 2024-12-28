import phone1 from './phone1.jpg'
import lap1 from './lap1.jpg'
import charge1 from './charge1.jpg'
import head1 from './head1.jpg'
import profile from './profile.png'

const menu_img=[ phone1,lap1,charge1,head1]
const menu_name=['Điện thoại','Laptop','Sạc','Tai nghe']


const menu = menu_name.map((name, index) => ({
    name,
    img: menu_img[index] || null, // Add null if the image is missing
  }));

export { menu,profile}; // Explicitly export `menu`


