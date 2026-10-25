import React from "react";
import "./ReviewSection.css";

const reviews = [
{
id: 1,
name: "Simran Kaur",
city: "Ludhiana",
state: "Punjab",
review:
"Ayur Netra Eye Drops di quality bahut vadhiya hai. Akhan nu soothing feel den bare mera experience changa reha, te price vi kaafi reasonable hai.",
},
{
id: 2,
name: "Harpreet Singh",
city: "Amritsar",
state: "Punjab",
review:
"Product di packaging premium hai te bottle di quality vi vadhiya lagdi hai. Ingredients te price de hisaab naal product kaafi appealing hai.",
},
{
id: 3,
name: "Manpreet Kaur",
city: "Jalandhar",
state: "Punjab",
review:
"Ayur Netra di quality te reasonable price is product nu khaas banaunde ne. Akhan layi soothing effect da claim vi product di appeal nu vadha dinda hai.",
},
{
id: 4,
name: "Gurpreet Singh",
city: "Patiala",
state: "Punjab",
review:
"Product di quality top-notch lagdi hai te packaging vi bahut changi hai. Genuine price te Ayurvedic formulation isnu ik vadhiya option banaunde ne.",
},
{
id: 5,
name: "Jasleen Kaur",
city: "Bathinda",
state: "Punjab",
review:
"Ayur Netra Eye Drops di bottle te packaging neat hai. Product di quality, reasonable price te Ayurvedic ingredients di information isnu appealing banaundi hai.",
},
{
id: 6,
name: "Amandeep Singh",
city: "Mohali",
state: "Punjab",
review:
"Quality te price da combination vadhiya lagda hai. Akhan di care layi product chunde same soothing effect, ingredients te safety di information bahut important hundi hai.",
},
];


function ReviewSection() {
return ( <section className="customer-reviews" id="reviews"> <div className="reviews-header"> <span className="reviews-eyebrow">
VAIDYA CO. 🌿 </span>

    <h2>Customer Reviews</h2>

    <p>Ayur Netra Eye Drops bare lokan di rai</p>

    <div className="reviews-divider">
      <span></span>
      🌿
      <span></span>
    </div>
  </div>

  <div className="reviews-grid">
    {reviews.map((item) => (
      <article className="review-card" key={item.id}>
        <div className="review-top">
          <div className="review-avatar">
            {item.name.charAt(0)}
          </div>

          <div className="review-person">
            <h3>{item.name}</h3>

            <p className="review-location">
              📍 {item.city}, {item.state}
            </p>
          </div>
        </div>

        <div className="review-stars" aria-label="Sample five-star rating">
          ★★★★★
        </div>

        <p className="review-text">{item.review}</p>
      </article>
    ))}
  </div>

  <div className="reviews-footer">
    <span>🌿</span>
    <p>Tuhada bharosa, saadi zimmedari!</p>
  </div>
</section>


);
}

export default ReviewSection;
