import React, { JSXElementConstructor } from "react";

interface ContainerProps {
  children: React.ReactNode;
  cols: number;
  style?: string;
}

const Container = ({ children, cols, style }: ContainerProps) => {
  //
  const colstr = `grid-cols-${cols}`;

  // * head 및 body 나누기 -----------------------------------------------------------------------------------------------------------------------------------

  const heads: React.ReactNode[] = [];
  const bodies: React.ReactNode[] = [];
  const others: React.ReactNode[] = [];

  React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const type = child.type as JSXElementConstructor<any>;

      if (type.name === "Head") heads.push(child);
      else if (type.name === "Body") bodies.push(child);
      else others.push(child);
    }
  });

  // bodies 요소에 heads 넘겨주기
  const bodiesWithProps = React.Children.map(bodies, (body) => {
    if (React.isValidElement(body)) {
      return React.cloneElement(body, { ...body.props, heads });
    }
  });

  return (
    <div className={style}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
        className={`w-full rounded-t-lg border border-[#E8E7E4] text-xs sm:text-[16px]`}
      >
        {heads}
      </div>

      {bodiesWithProps!.map((body, i) => (
        <div
          key={i}
          className={`w-full grid ${colstr} border border-t-0 text-xs sm:text-[16px]`}
        >
          {body}
        </div>
      ))}

      {others}
    </div>
  );
};

interface HeadProps {
  id: string;
  width: number;
  children: React.ReactNode;
}

const Head = ({ width, children }: HeadProps) => {
  //
  const colspan = `col-span-${width}`;

  return (
    <div
      style={{ gridColumn: `span ${width} / span ${width}` }}
      className={`p-1 border-r text-center bg-[#F7F6F3]`}
    >
      {children}
    </div>
  );
};

interface BodyProps {
  children: React.ReactNode;
  heads?: React.ReactNode[];
}

// 줄 하나임
const Body = ({ children, heads }: BodyProps) => {
  //
  // children 은 칸 하나 (div)

  const cellsWithWidth = React.Children.map(children, (cell) => {
    if (React.isValidElement(cell)) {
      //
      // 현재 칸의 헤드명 (= 현재 칸의 id)
      const currentCellHead = cell.props.id;

      // 현재 칸 너비
      let width = 1;

      // 현재 칸 헤드의 너비 찾아서 width 에 할당
      heads!.forEach((head) => {
        if (React.isValidElement(head)) {
          const headId = head.props.id;
          if (headId === currentCellHead) width = head.props.width;
        }
      });

      const colspan = `col-span-${width}`;

      const className = `${cell.props.className} ${colspan} border-r`;

      // 현재 칸에 올바른 너비 주기
      return React.cloneElement(cell, { ...cell.props, className });
    }
  });

  return <>{cellsWithWidth}</>;
};

export default { Container, Head, Body };
