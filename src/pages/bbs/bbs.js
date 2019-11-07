import React, { useState, useEffect } from "react";
function Bbs() {
  const [title, setTitle] = useState();
  useEffect(() => {
    document.title = title;
  });
  return <input onChange={e => setTitle(e.target.value)} type="text" />;
}
// class Index extends Component {
//   constructor(props){
//     super(props);

//   }
//   componentDidMount() {

//   }

//   render() {
//     return (
//       <section className="bbsContent">
//         开始你的表演
//       </section>
//     );
//   }
// }

// export default Index;
