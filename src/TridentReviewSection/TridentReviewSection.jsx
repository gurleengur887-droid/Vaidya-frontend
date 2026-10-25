import React from "react";
import "./TridentReviewSection.css";

const reviews = [
{
id: 1,
name: "Simran Kaur",
city: "Ludhiana",
state: "Punjab",
review:
"Trident Tooth Lotion di packaging bahut vadhiya hai. Bottle di quality te product di presentation kaafi changi lagdi hai. Price te ingredients di information vi clear honi chahidi hai.",
},
{
id: 2,
name: "Harpreet Singh",
city: "Amritsar",
state: "Punjab",
review:
"Product di packaging premium lagdi hai te bottle vi convenient hai. Mainu Ayurvedic oral care products pasand ne, par use karan ton pehlan ingredients te directions check karna zaroori samajhda haan.",
},
{
id: 3,
name: "Manpreet Kaur",
city: "Jalandhar",
state: "Punjab",
review:
"Trident Natural Tooth Lotion di presentation neat te professional hai. Product di quality, reasonable price te ingredients bare clear information customers layi important hundi hai.",
},
{
id: 4,
name: "Gurpreet Singh",
city: "Patiala",
state: "Punjab",
review:
"Bottle da design te packaging changi hai. Oral care product choose karde time ingredients, use karan da tareeka te product di quality bare detail milni chahidi hai.",
},
{
id: 5,
name: "Jasleen Kaur",
city: "Bathinda",
state: "Punjab",
review:
"Trident di packaging simple te attractive hai. Product di quantity, price te Ayurvedic ingredients bare proper details hon naal customer nu decision lain vich help mildi hai.",
},
{
id: 6,
name: "Amandeep Singh",
city: "Mohali",
state: "Punjab",
review:
"Oral care layi product select karde hoye quality te ingredients mere layi important ne. Trident di product information te directions clearly mention honiyan chahidiyan ne.",
},
];

const TridentReviewSection = () => {
return ( <section className="trident-reviews"> <div className="trident-reviews-header"> <span className="trident-reviews-eyebrow">
VAIDYA CO. 🌿 </span>


    <h2>Customer Reviews</h2>

    <p>Trident Natural Tooth Lotion bare lokan di rai</p>

    <div className="trident-reviews-divider">
      <span />
      <span className="trident-divider-leaf">🌿</span>
      <span />
    </div>
  </div>

  <div className="trident-reviews-grid">
    {reviews.map((review) => (
      <article className="trident-review-card" key={review.id}>
        <div className="trident-review-top">
          <div className="trident-review-avatar">
            {review.name.charAt(0)}
          </div>

          <div className="trident-review-person">
            <h3>{review.name}</h3>

            <p className="trident-review-location">
              📍 {review.city}, {review.state}
            </p>
          </div>
        </div>

        <div
          className="trident-review-stars"
          aria-label="5 out of 5 stars"
        >
          ★★★★★
        </div>

        <p className="trident-review-text">
          {review.review}
        </p>
      </article>
    ))}
  </div>

  <div className="trident-reviews-footer">
    <span>🌿</span>
    <p>Tuhada bharosa, saadi zimmedari!</p>
  </div>
</section>


);
};

export default TridentReviewSection;
