import Card from "./Card";
import CardSkeleton from "./CardLoader";

const CardList = ({ data, handleEdit, handleDelete }) => {
  if (data.length === 0) {
    return (
      <div className="mt-7 prompt_layout">
        {Array.from({ length: 9 }, (_, i) => i + 1).map(() => (
          <CardSkeleton />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-7 prompt_layout">
      {data.map((post) => (
        <Card
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
  );
};

const ProfileCard = ({ name, desc, data, handleEdit, handleDelete }) => {
  // console.log(data);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {/* <div className="mt-7 prompt_layout"> */}
      <CardList
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default ProfileCard;
