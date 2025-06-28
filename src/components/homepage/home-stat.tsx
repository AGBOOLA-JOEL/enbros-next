// import { Plus, ArrowUpRight } from "lucide-react";

// const HomeStat = () => {
//   return (
//     <div className="homepage__stat">
//       <div className="homepage__stat__container">
//         <div className="homepage__stat__left">
//           <div className="homepage__stat__content">
//             <h1 className="homepage__stat__title">
//               Share Your Knowledge. Inspire Developers.
//             </h1>
//             <p className="homepage__stat__description">
//               Welcome to the heart of developer storytelling. Dev-Blog is your
//               platform to share ideas, projects, and lessons from the world of
//               coding. Join a community where knowledge fuels innovation.
//             </p>
//           </div>

//           <div className="homepage__stat__metrics">
//             <div className="homepage__stat__metric">
//               <div className="homepage__stat__icon">
//                 <Plus size={24} />
//               </div>
//               <span className="homepage__stat__label">Resources available</span>
//             </div>
//             <div className="homepage__stat__metric">
//               <div className="homepage__stat__icon">
//                 <Plus size={24} />
//               </div>
//               <span className="homepage__stat__label">Post Published</span>
//             </div>
//             <div className="homepage__stat__metric">
//               <div className="homepage__stat__icon">
//                 <Plus size={24} />
//               </div>
//               <span className="homepage__stat__label">Active Users</span>
//             </div>
//           </div>
//         </div>

//         <div className="homepage__stat__right">
//           <div className="homepage__stat__visual">
//             <div className="homepage__stat__lines">
//               {Array.from({ length: 120 }, (_, i) => (
//                 <div
//                   key={i}
//                   className="homepage__stat__line"
//                   style={{
//                     transform: `rotate(${i * 3}deg)`,
//                     animationDelay: `${i * 0.01}s`,
//                   }}
//                 ></div>
//               ))}
//             </div>

//             <div className="homepage__stat__community">
//               <img
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blogpeople-Kqnr7uIwpnYFOb9tz0a7W0huXCmzjZ.png"
//                 alt="Community members"
//                 className="homepage__stat__avatars"
//               />
//             </div>
//           </div>

//           <div className="homepage__stat__bottom">
//             <p className="homepage__stat__info">
//               Over 1,000 articles on programming, technology, and breakthroughs.
//             </p>
//             <button className="homepage__stat__cta">
//               Create a post
//               <ArrowUpRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeStat;
import { Plus, ArrowUpRight } from "lucide-react";

const HomeStat = () => {
  return (
    <div className="homepage__stat">
      <div className="homepage__stat__container">
        <div className="homepage__stat__left">
          <div className="homepage__stat__content">
            <p className="homepage__stat__topdescription">
              Share Your Knowledge. Inspire Developers.
            </p>
            <h1 className="homepage__stat__title">
              Share Your Knowledge. Inspire Developers.
            </h1>
            <p className="homepage__stat__description">
              Welcome to the heart of developer storytelling. Dev-Blog is your
              platform to share ideas, projects, and lessons from the world of
              coding. Join a community where knowledge fuels innovation.
            </p>
          </div>

          <div className="homepage__stat__metrics">
            <div className="homepage__stat__metric">
              <div className="homepage__stat__icon">
                <span>300</span> <Plus size={24} />
              </div>
              <span className="homepage__stat__label">Resources available</span>
            </div>
            <div className="homepage__stat__metric">
              <div className="homepage__stat__icon">
                <span>10K</span>
                <Plus size={24} />
              </div>
              <span className="homepage__stat__label">Post Published</span>
            </div>
            <div className="homepage__stat__metric">
              <div className="homepage__stat__icon">
                <span>12k</span>
                <Plus size={24} />
              </div>
              <span className="homepage__stat__label">Active Users</span>
            </div>
          </div>
        </div>

        <div className="homepage__stat__right">
          <div className="homepage__stat__visual">
            <div className="homepage__stat__community">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blogpeople-Kqnr7uIwpnYFOb9tz0a7W0huXCmzjZ.png"
                alt="Community members"
                className="homepage__stat__avatars"
              />
            </div>
          </div>

          <div className="homepage__stat__bottom">
            <p className="homepage__stat__info">
              Over 1,000 articles on programming, technology, and breakthroughs.
            </p>
            <button className="homepage__stat__cta">
              Create a post
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStat;
