import { useState ,useEffect} from "react";
import FriendForm from "./FriendForm";
import Friends from "./Friends";
import Pagination from "./Pagination";
import SearchName from "./searchName";

function FriendList() {
  const [friends, setFriends] = useState([
    { id: 0, name: "Ankit", isSelected: false },
    { id: 1, name: "John", isSelected: false },
    { id: 2, name: "Abhi", isSelected: false },
    { id: 3, name: "Mary", isSelected: false },
    { id: 4, name: "Lucy", isSelected: false },
    { id: 5, name: "Dexter", isSelected: false },
  ]);
  const [searchText, setsearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [pageDatas, setPageDatas] = useState([]);
  const [allDatas, setAllDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const NO_RECORDS = 4;
  const addFriends = (friend) => {
    if (!friend.name) {
      return;
    }
    const newFriends = [friend, ...friends];
    if (searchText !== "") {
      setFilteredResults(newFriends);
    } else {
      setFriends(newFriends);
    }
  };

  const removeFriends = (id) => {
    const filteredArr = [...friends].filter((friend) => friend.id !== id);
    if (searchText !== "") {
      setFilteredResults(filteredArr);
    } else {
      setFriends(filteredArr);
    }
  };

  const searchFriends = (text) => {
    if (text !== "") {
      setsearchText(text);
      const filteredArr = [...friends].filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredResults(filteredArr.length ? filteredArr : []);
    } else {
      fetchData();
    }
  };

  const displayDataPerPage = (data) => {
    // setFriends(data);
    setPageDatas(data);
  };

  const fetchData=()=>{
    if (friends.length) {
      let data = [];
      setAllDatas(friends);
      friends.map((item, index) => {
        if (index < NO_RECORDS) {
          data.push(item);
        }
        return true;
      });
      let total = isInt(friends.length, NO_RECORDS);
      let totalpgs =
        total !== true
          ? parseInt(friends.length / NO_RECORDS) + 1
          : friends.length / NO_RECORDS;
      let pgs = [];
      for (let i = 1; i <= Number(totalpgs); i++) {
        pgs.push(i);
      }
      setTotalPage(pgs);
      displayDataPerPage(data);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (friends.length) {
        let data = [];
        setAllDatas(friends);
        friends.map((item, index) => {
          if (index < NO_RECORDS) {
            data.push(item);
          }
          return true;
        });
        let total = isInt(friends.length, NO_RECORDS);
        let totalpgs =
          total !== true
            ? parseInt(friends.length / NO_RECORDS) + 1
            : friends.length / NO_RECORDS;
        let pgs = [];
        for (let i = 1; i <= Number(totalpgs); i++) {
          pgs.push(i);
        }
        setTotalPage(pgs);
        displayDataPerPage(data);
      }
    }
    fetchData();
  }, [friends]);

  function isInt(len, display) {
    return len % display === 0;
  }

  const prevPage = () => {
    let page = currentPage - 1;
    setCurrentPage(page);
    let data = [];
    allDatas.map((item, index) => {
      if (index < page * NO_RECORDS && index >= (page - 1) * NO_RECORDS) {
        data.push(item);
      }
      return true;
    });
    displayDataPerPage(data);
  };

  const nextPage = () => {
    let page = currentPage + 1;
    setCurrentPage(page);
    let data = [];
    allDatas.map((item, index) => {
      if (index < page * NO_RECORDS && index >= (page - 1) * NO_RECORDS) {
        data.push(item);
      }
      return true;
    });
    displayDataPerPage(data);
  };

  const firstPage = () => {
    let page = 1;
    setCurrentPage(page);
    let data = [];
    allDatas.map((item, index) => {
      if (index < page * NO_RECORDS && index >= (page - 1) * NO_RECORDS) {
        data.push(item);
      }
      return true;
    });
    displayDataPerPage(data);
  };

  const activePageClick = (page) => {
    setCurrentPage(page);
    let data = [];
    allDatas.map((item, index) => {
      if (index < page * NO_RECORDS && index >= (page - 1) * NO_RECORDS) {
        data.push(item);
      }
      return true;
    });
    displayDataPerPage(data);
  };

  const lastPage = () => {
    let page = totalPage.length;
    setCurrentPage(page);
    let data = [];
    allDatas.map((item, index) => {
      if (index < page * NO_RECORDS && index >= (page - 1) * NO_RECORDS) {
        data.push(item);
      }
      return true;
    });
    displayDataPerPage(data);
  };
  return (
    <>
      <h3 className={"cardHeader"}>Friends List</h3>
      <SearchName onSearch={searchFriends} />
      <FriendForm listLength={friends.length} onSubmit={addFriends} />
      {filteredResults.length > 0 || searchText !== "" ? (
        <Friends
          friends={filteredResults}
          removeFriends={removeFriends}
          searchText={searchText}
          setFilteredResults={setFilteredResults}
          setFriends={setFriends}
        />
      ) : (
        <Friends
          friends={pageDatas}
          removeFriends={removeFriends}
          searchText={searchText}
          setFilteredResults={setFilteredResults}
          setFriends={setFriends}
        />
      )}
      {<Pagination currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} nextPage={nextPage} activePageClick={activePageClick} totalPage={totalPage} prevPage={prevPage}/>}
    </>
  );
}

export default FriendList;
