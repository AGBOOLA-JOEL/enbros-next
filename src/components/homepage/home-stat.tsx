// export default HomeStat;
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useGenselectors } from "@/lib/store/general-store";
import { Plus, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeStat = () => {
  const openToast = useGenselectors.use.openToast();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    console.log("clicked");
    !isAuthenticated
      ? openToast("Login to view page", 4000)
      : router.push("/create-post");
  };
  return (
    <div className="homepage__stat">
      <div className="homepage__stat__container">
        <div className="homepage__stat__left">
          <div className="homepage__stat__content">
            <p className="homepage__stat__topdescription">
              {isAuthenticated
                ? `Dear ${user?.username}, explore the world of blogposts`
                : "Explore the world of blogposts"}
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
              <Image
                width={0}
                height={0}
                sizes={"100vw"}
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
            <button className="homepage__stat__cta" onClick={handleClick}>
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
