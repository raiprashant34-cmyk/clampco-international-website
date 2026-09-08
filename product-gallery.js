const referenceImages={
 welding:[
  'https://fourieweldingandtool.co.za/wp-content/uploads/2019/11/chisa-super-7-welding-rods-5kg-box.jpg',
  'https://i.ebayimg.com/images/g/Tu8AAOSwlcBlL9nE/s-l1200.jpg',
  'https://todoparalaindustria.com/cdn/shop/products/16391.jpg?v=1698171976&width=800'
 ],
 stainless309:[
  'https://image.made-in-china.com/2f0j00OqJWECsmPhrA/S-S-Steel-Aws-E309L-16welding-Rod-Filler-Material-Welding-Electrodes.jpg',
  'https://www.soldacor.es/66-large_default/electrodos-inoxidable-e316l-16-bohler-aws.jpg',
  'https://todoparalaindustria.com/cdn/shop/products/16391.jpg?v=1698171976&width=800'
 ],
 hardfacing:[
  'https://www.yawata.co.th/uploads/product/thumbnail/20180621/aefghjnpsz67.jpg',
  'https://fourieweldingandtool.co.za/wp-content/uploads/2019/11/chisa-super-7-welding-rods-5kg-box.jpg',
  'https://i.ebayimg.com/images/g/Tu8AAOSwlcBlL9nE/s-l1200.jpg'
 ],
 castiron:[
  'https://www.yawata.co.th/uploads/product/20180718/acefgmnrsw06.jpg',
  'https://www.yawata.co.th/uploads/product/thumbnail/20180621/aefghjnpsz67.jpg',
  'https://fourieweldingandtool.co.za/wp-content/uploads/2019/11/chisa-super-7-welding-rods-5kg-box.jpg'
 ],
 mig:[
  'https://copperbridgeusa.com/cdn/shop/files/1.ER70S-6.030_2lb.png?v=1768766607',
  'https://media.s-bol.com/xmoAgPp3qRkn/EJLWGN/550x615.jpg',
  'https://static.grainger.com/rp/s/is/image/Grainger/20AP03_GC01'
 ],
 stainlessMig:[
  'https://cdn11.bigcommerce.com/s-zvfd115tfa/images/stencil/1280x1280/products/1631/13217/0309LE5POP-2__18250.1657029322.jpg?c=2',
  'https://static.grainger.com/rp/s/is/image/Grainger/20AP03_GC01',
  'https://media.s-bol.com/xmoAgPp3qRkn/EJLWGN/550x615.jpg'
 ],
 aluminium:[
  'https://http2.mlstatic.com/D_NQ_NP_877246-MLA87569009749_072025-O.webp',
  'https://i5.walmartimages.com/asr/cb855b79-cd35-40ac-ac1c-317549f40536_1.49c12dfb190bfa09dd615d26337584f3.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768',
  'https://copperbridgeusa.com/cdn/shop/files/1.ER70S-6.030_2lb.png?v=1768766607'
 ],
 fcaw:[
  'https://static.gasandsupply.com/images/product/400/SLA1211545.jpg',
  'https://copperbridgeusa.com/cdn/shop/files/1.ER70S-6.030_2lb.png?v=1768766607',
  'https://media.s-bol.com/xmoAgPp3qRkn/EJLWGN/550x615.jpg'
 ],
 saw:[
  'https://hatex.vn/upload/files/member_upload/h28821/files/8495em12k.jpg',
  'https://copperbridgeusa.com/cdn/shop/files/1.ER70S-6.030_2lb.png?v=1768766607',
  'https://media.s-bol.com/xmoAgPp3qRkn/EJLWGN/550x615.jpg'
 ],
 abrasives:[
  'https://www.ohiopowertool.com/media/catalog/product/4/9/49-94-9000_x8m3vtpew1fqktce.jpg?bg-color=255%2C255%2C255&canvas=573%3A573&fit=bounds&height=573&optimize=high&width=573',
  'https://cdn11.bigcommerce.com/s-a579g2rqqa/products/8925/images/22374/51725-norton-150-x-25mm-46-grit-medium-grey-aluminium-oxide-grinding-wheel-66253130541-hero__71511.1654149896.1280.1280.jpg?c=1',
  'https://ferretek.cl/media/catalog/product/0/3/0301492308_17.jpg'
 ]
};
function gallerySet(slug,title){
 const s=(slug||'') .toLowerCase();
 if(s.includes('309l-electrode'))return referenceImages.stainless309;
 if(s.includes('hardfacing'))return referenceImages.hardfacing;
 if(s.includes('cast-iron'))return referenceImages.castiron;
 if(s.includes('308l-electrode')||s.includes('316l-electrode'))return referenceImages.stainless309;
 if(s.includes('er309l'))return referenceImages.stainlessMig;
 if(s.includes('er316l')||s.includes('er308l'))return referenceImages.stainlessMig;
 if(s.includes('er4043')||s.includes('er5356'))return referenceImages.aluminium;
 if(s.includes('e71t'))return referenceImages.fcaw;
 if(s.includes('em12k'))return referenceImages.saw;
 if(s.includes('er70s'))return referenceImages.mig;
 if(['cutoff','grinding','ultrathin','flap-disc','fibre-disc'].includes(s))return referenceImages.abrasives;
 if(s.includes('e6013')||s.includes('e7018')||s.includes('e7016'))return referenceImages.welding;
 if((title||'').includes('ER309L'))return referenceImages.stainlessMig;
 if((title||'').includes('ER316L'))return referenceImages.stainlessMig;
 if((title||'').includes('ER5356')||(title||'').includes('ER4043'))return referenceImages.aluminium;
 return referenceImages.welding;
}
function addReferenceGallery(){
 const isDynamic=location.pathname.endsWith('/product.html');
 const isFeatured=document.querySelector('.featured-product');
 if(!isDynamic&&!isFeatured)return;
 const slug=new URLSearchParams(location.search).get('product')||location.pathname.split('/').pop().replace('product-','').replace('.html','');
 const title=document.querySelector('.featured-product h1')?.textContent||document.querySelector('#product-detail h1')?.textContent||'';
 const images=gallerySet(slug,title);
 if(document.querySelector('.reference-gallery'))return;
 const gallery=document.createElement('section');gallery.className='reference-gallery';
 gallery.innerHTML=`<div class="reference-gallery-inner"><div class="reference-heading"><div><p class="eyebrow">PRODUCT REFERENCE IMAGES</p><h2>Visual reference</h2></div><span>Temporary online images · to be replaced with approved CLAMPCO product photography</span></div><div class="reference-grid">${images.map((src,i)=>`<figure><img src="${src}" alt="${title||'Industrial product'} reference image ${i+1}" loading="lazy"><figcaption>Reference image ${i+1}</figcaption></figure>`).join('')}</div><p class="reference-note">These images are used only as temporary visual references. They do not represent final CLAMPCO packaging, branding, dimensions or exact product configuration.</p></div>`;
 if(isFeatured){const section=document.querySelector('.featured-section');section?.before(gallery);}else{const hero=document.querySelector('.product-detail-hero');hero?.after(gallery);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addReferenceGallery);else addReferenceGallery();
