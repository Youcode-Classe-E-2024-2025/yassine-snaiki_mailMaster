import React, { useEffect, useState } from "react";

import NewsLetter from './NewsLetter'
import Compaign from './Compaign'
import Subscribers from "./Subscribers";










export default function Dashboard() {
    const [newsletters, setNewsletters] = useState([]);

  const [subscribers, setSubscribers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const[emailLoding , setEmailLoding] = useState(false);


  // States for creating newsletters
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [template, setTemplate] = useState("");

  // States for creating campaigns
  const [subject, setSubject] = useState("");
  const [newsletterId, setNewsletterId] = useState("");

  // States for running campaigns
  const [campaignId, setCampaignId] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);

  // States for UI
  const [activeTab, setActiveTab] = useState("newsletters");
  const [isLoading, setIsLoading] = useState(false);

  const [subscribersEmails, setSubscribersEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async (campaignId) => {
    console.log("Fetching subscribers for campaign ID:", campaignId);

    try {

      // setLoading(true);

      const res = await fetch(`http://127.0.0.1:8000/api/campaigns/emails/${campaignId}`);

      console.log(res.status);

      if (!res.ok) {

        throw new Error("Network response was not ok");

      }

      console.log(res);

      const data = await res.json();
      console.log(data);


      setSubscribersEmails(data);

      console.log(subscribersEmails , "subscribersEmails");


      setEmailLoding(true);

    } catch (err) {
      console.error("Failed to fetch subscribers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (campaignId) => {
    setActiveTab(campaignId);
    fetchSubscribers(campaignId);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [newslettersRes, subscribersRes, campaignsRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/newsletters").then(res => res.json()),
        fetch("http://127.0.0.1:8000/api/subscribers").then(res => res.json()),
        fetch("http://127.0.0.1:8000/api/campaigns").then(res => res.json())
      ]);

      setNewsletters(newslettersRes);
      setSubscribers(subscribersRes);
      setCampaigns(campaignsRes);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };


  const createNewsletter = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/newsletters/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, template , user_id : localStorage.getItem('user_id')})
      });

      if (!response.ok) throw new Error("Failed to create newsletter");

      // Clear form and refresh data
      setTitle("");
      setContent("");
      setTemplate("");
      fetchData();
    } catch (error) {
      console.log(error );

    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/campaigns/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, newsletter_id: newsletterId  , user_id : localStorage.getItem('user_id')})
      });

      if (!response.ok) throw new Error("Failed to create campaign");

      // Clear form and refresh data
      setSubject("");
      setNewsletterId("");
      fetchData();
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  const runCampaign = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedSubscribers = selectedSubs.map(id => {
        const sub = subscribers.find(s => s.id === parseInt(id));
        return { id: sub.id, name: sub.name, email: sub.email };
      });

      const response = await fetch("http://127.0.0.1:8000/api/campaigns/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: campaignId,
          subscribers: selectedSubscribers
        })
      });

      if (!response.ok) throw new Error("Failed to run campaign");

      // Clear form and refresh data
      setCampaignId("");
      setSelectedSubs([]);
      fetchData();

    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  const deleteNewsletter = async (id) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/newsletters/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete newsletter");

        fetchData();

      } catch (error) {

      }
    }
  };

  const deleteCampaign = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/campaigns/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete campaign");

        fetchData();

      } catch (error) {

      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white">
  {/* Dashboard Header */}
  <div className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg rounded-b-3xl pb-10 pt-8 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight">📬 Newsletter Dashboard</h1>
      <p className="mt-2 text-white/90 text-lg">Manage your newsletters, campaigns, and subscribers</p>
    </div>
  </div>

  {/* Navigation Tabs */}
  <div className="bg-white shadow-md rounded-xl -mt-6 mb-6 mx-4 md:mx-auto max-w-5xl relative z-10">
    <div className="flex overflow-x-auto scrollbar-hide justify-center gap-4 px-4 py-3 text-sm font-medium">
      {[
        { name: "Newsletters", key: "newsletters" },
        { name: "Campaigns", key: "campaigns" },
        { name: `Subscribers (${subscribers.length})`, key: "subscribers" },
      ].map(({ name, key }) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`relative px-4 py-2 rounded-lg transition-all duration-300
            ${
              activeTab === key
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {name}
        </button>
      ))}
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-6 py-4">
    {activeTab === "newsletters" && (
      <div className="animate-fade-in">
        <NewsLetter
          createNewsletter={createNewsletter}
          title={title}
          content={content}
          template={template}
          setTitle={setTitle}
          setContent={setContent}
          setTemplate={setTemplate}
          isLoading={isLoading}
          newsletters={newsletters}
          deleteNewsletter={deleteNewsletter}
        />
      </div>
    )}

    {activeTab === "campaigns" && (
      <div className="animate-fade-in">
        <Compaign
          createCampaign={createCampaign}
          newsletters={newsletters}
          newsletterId={newsletterId}
          subject={subject}
          isLoading={isLoading}
          campaigns={campaigns}
          deleteCampaign={deleteCampaign}
          setSubject={setSubject}
          setNewsletterId={setNewsletterId}
          runCampaign={runCampaign}
          selectedSubs={selectedSubs}
          setSelectedSubs={setSelectedSubs}
          subscribers={subscribers}
          setCampaignId={setCampaignId}
        />
      </div>
    )}

    {activeTab === "subscribers" && (
      <div className="animate-fade-in">
        <Subscribers subscribers={subscribers} />
      </div>
    )}
  </div>
</div>

  );
}
