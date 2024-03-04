const site_url = "https://localhost:7176/api/";

const layouturl = site_url + "layout";
const layoutnew = site_url + "layout/new";
const layouteditpost = site_url + "layout/edit";
const layoutdeletepost = site_url + "layout/delete";

const layoutitemurl = site_url + "layout/items/0";
const layoutindexlist = site_url + "layout/items/list";
const layouteditget = site_url + "layout/edit/get";
const layoutitemeditpost = site_url + "layout/items/edit";
const layoutitemurladd = site_url + "layout/items/new";
const layoutitemdeleteurl = site_url + "layout/items/delete";
export const layoutlist = async () => {
  try {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(layouturl, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data.result.data;
  } catch (error) {
    console.error("Error fetching layout data:", error);
    throw error;
  }
};

//get layout item list
export const layoutitemlist = async () => {
  try {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(layoutitemurl, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data.result.data;
  } catch (error) {
    console.error("Error fetching layout data:", error);
    throw error;
  }
};

export const layoutindexlistGet = async () => {
  try {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(layoutindexlist, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data.result.data;
  } catch (error) {
    console.error("Error fetching layout data:", error);
    throw error;
  }
};
//layout new
export const addLayout = async (formData) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(layoutnew, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to add layout item: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding layout item:", error);
    throw error;
  }
};

//new item
export const addLayoutItem = async (newItemData) => {
  try {
    debugger;
    newItemData.layoutItemId = 0;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItemData),
    };
    const response = fetch(layoutitemurladd, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to add layout item: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding layout item:", error);
    throw error;
  }
};

//edit layoutlist
export const LayoutEditPost = async (postData) => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };
  const data = (await (await fetch(layouteditpost, requestOptions)).json())
    .result;
  return data;
};

//edit layoutitems
export const LayoutItemEditPost = async (postItem) => {
  debugger;
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postItem),
  };
  const data = (await (await fetch(layoutitemeditpost, requestOptions)).json())
    .result;
  return data;
};

// layout delete
export const LayoutDeletePost = async (layoutId) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${layoutdeletepost}?layoutId=${layoutId}`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to delete layout item: ${data.message}`);
    }

    return data.result;
  } catch (error) {
    console.error("Error deleting layout item:", error);
    throw error;
  }
};

export const LayoutItemDeletePost = async (layoutItemId) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${layoutitemdeleteurl}?layoutItemId=${layoutItemId}`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to delete layout item: ${data.message}`);
    }
    window.location.reload();
    return data.result;
  } catch (error) {
    console.error("Error deleting layout item:", error);
    throw error;
  }
};

export const LayoutEditGetDetails = async (id = 3) => {
  debugger;
  var requestOptions = {
    method: "GET",
  };
  const data = (
    await (
      await fetch(`${layouteditget}?layoutId=${id}`, requestOptions)
    ).json()
  ).result.data;
  return data;
};
