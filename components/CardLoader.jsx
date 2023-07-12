import ContentLoader from "react-content-loader";
import { Skeleton } from "@material-ui/lab";
import { red } from "@material-ui/core/colors";

const CardSkeleton = () => {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Skeleton
            className="greyClass"
            variant="circle"
            width={45}
            height={45}
            animation="wave"
          />

          <div className="flex flex-col gap-3">
            <Skeleton
              className="greyClass"
              variant="rect"
              width={150}
              height={10}
              animation="wave"
            />

            <Skeleton
              className="greyClass"
              variant="rect"
              width={200}
              height={10}
              animation="wave"
            />
          </div>
        </div>

        <div className="copy_btn">
          <Skeleton
            className="greyClass"
            variant="rect"
            width={15}
            height={15}
            animation="wave"
          />
        </div>
      </div>

      <Skeleton
        className="my-4 greyClass"
        variant="rect"
        width={"100%"}
        height={200}
        animation="wave"
      />

      <p>
        <Skeleton
          className="my-2 greyClass"
          variant="rect"
          width={"100%"}
          height={10}
          animation="wave"
        />
      </p>
    </div>
  );
};

export default CardSkeleton;
