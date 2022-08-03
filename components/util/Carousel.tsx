import React, { useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

interface CarouselProps {
  children: React.ReactNode;
  btnRef: {
    left: React.MutableRefObject<HTMLButtonElement>;
    right: React.MutableRefObject<HTMLButtonElement>;
  };
}

const Carousel = ({ children, btnRef }: CarouselProps) => {
  /**
   *
   * ( 캐러셀 너비는 100% , gap-x 는 24px )
   *
   * 뷰포트 너비가
   * 425px 미만이면 카드 1개 ---> 카드 너비 = 100%
   * 768px 미만이면 카드 2개 ---> 카드 너비 = (100% - 24px) / 2
   * 1024px 미만이면 카드 3개
   * else 카드 4개
   *
   */

  // 뷰포트 너비
  const { width } = useWindowDimensions();

  // 내부 컨텐츠 너비
  const getContentWidth = () => {
    if (width < 425) return "100%";
    else if (425 <= width && width < 768) return "calc((100% - 24px) / 2)";
    else if (768 <= width && width < 1024) return "calc((100% - 48px) / 3)";
    else return "calc((100% - 72px) / 4)";
  };
  const contentWidth = getContentWidth();

  // 컨텐츠 컴포넌트들에게 자신의 너비 전달
  const childrenWithWidth = React.Children.map(children, (child) => {
    if (React.isValidElement(child))
      return React.cloneElement(child, {
        ...child.props,
        contentWidth,
      });
    return child;
  });

  // 캐러셀 좌우 이동 버튼 클릭 횟수 (= 맨 왼쪽에 보여지는 카드 인덱스와 같음)
  const [btnCounter, setBtnCounter] = useState(0);

  // 클릭당 이동할 거리 (컨텐츠 하나 너비 + 간격 하나 너비)
  const distanceAtOnce = `calc(${contentWidth} + 24px)`;

  // 좌우 이동 버튼 클릭한 횟수에 따른 총 이동 거리
  const distanceTotal = `calc(${btnCounter} * ${distanceAtOnce})`;

  // 오른쪽 버튼 클릭
  const onRightClick = () => {
    const val = parseInt(getContentWidth().split("/")[1]);
    const cardsToShow = val ? val : 1; // 현재 브라우저 너비에서 한 번에 보여줄 카드 갯수

    // 한 번에 보일 카드 수 + 첫 카드 번호 < 전체 컨텐츠 (카드) 갯수면 마지막까지 보여준거니까 더 이상 안움직임
    if (cardsToShow + Math.abs(btnCounter) < React.Children.count(children))
      setBtnCounter(btnCounter - 1);
  };

  // 왼쪽 버튼 클릭 (btnCounter 가 0이면 가장 첫 번째 카드가 맨 왼쪽에 와있는 것이므로 움직이지 않는다)
  const onLeftClick = () => btnCounter && setBtnCounter(btnCounter + 1);

  return (
    <div className="flex bg-[#F7F6F3] p-3 md:p-6 rounded-lg overflow-hidden">
      <div
        style={{ transform: `translateX(${distanceTotal})` }}
        className="flex w-full gap-x-6 transition-transform duration-200"
      >
        {childrenWithWidth}
      </div>

      <button ref={btnRef.left} onClick={onLeftClick} className="hidden">
        left
      </button>
      <button ref={btnRef.right} onClick={onRightClick} className="hidden">
        Right
      </button>
    </div>
  );
};

export default Carousel;
