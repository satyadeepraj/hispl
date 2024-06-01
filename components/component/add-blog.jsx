"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import axios from "axios";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { ToastContainer } from "react-toastify";

export function AddBlog() {
  const maintitleRef = useRef();
  const authorRef = useRef();
  const maincontentRef = useRef();
  const tagsRef = useRef();
  const datePublishedRef = useRef();

  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4ref = useRef();

  const [sections, setSections] = useState([{ title: "", content: [""] }]);

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();

    formData.append("maintitle", maintitleRef.current.value);
    formData.append("author", authorRef.current.value);
    formData.append("maincontent", maincontentRef.current.value);
    formData.append("tags", tagsRef.current.value);

    const selectedDate = new Date(datePublishedRef.current.value);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    formData.append("datePublished", formattedDate);
    console.log(maintitleRef.current.value);
    console.log(tagsRef.current.value);
    console.log(sections);

    sections.forEach((section, index) => {
      formData.append(`sections[${index}][title]`, section.title);
      section.content.forEach((content, contentIndex) => {
        formData.append(`sections[${index}][content][${contentIndex}]`, content);
      });
    });

    if (image1Ref.current.files[0]) {
      formData.append("image1", image1Ref.current.files[0]);
    }

    if (image2Ref.current.files[0]) {
      formData.append("image2", image2Ref.current.files[0]);
    }

    if (image3Ref.current.files[0]) {
      formData.append("image3", image3Ref.current.files[0]);
    }

    if (image4ref.current.files[0]) {
      formData.append("image4", image4ref.current.files[0]);
    }
    console.log(formData);
    // Add scammer details to formData

    try {
      const response = await axios.post("/api/addBlogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
       window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleContentChange = (sectionIndex, contentIndex, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].content[contentIndex] = value;
    setSections(newSections);
  };


  const addSection = () => {
    setSections([...sections, { title: "", content: [""] }]);
  };

  const addContent = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].content.push("");
    setSections(newSections);
  };

  return (
    <div className=" min-h-screen w-full bg-[#F1F1F1]">
    <Header />
    <ToastContainer />
    <div className="flex bg-[#F1F1F1] flex-col sm:flex-row   max-w-full min-h-screen">
      <div className="w-[25%] mobile:hidden">
        <SideBar />
      </div>
    <div className="w-full mt-16 max-w-4xl mx-auto p-6 md:p-8 lg:p-10">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="maintitle">Title</Label>
            <Input
              id="maintitle"
              placeholder="Enter blog post title"
              ref={maintitleRef}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Enter author name"
              ref={authorRef}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maincontent">Content</Label>
          <Textarea
            className="min-h-[300px]"
            id="maincontent"
            placeholder="Enter blog post content"
            ref={maincontentRef}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="publication-date">Publication Date</Label>
            <Input
              id="datePublished"
              placeholder="Enter Date"
              ref={datePublishedRef}
              type="date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              ref={tagsRef}
            />
          </div>
        </div>
        {sections.map((section, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`section-title-${index}`}>
              Section {index + 1} Title
            </Label>
            <Input
              id={`section-title-${index}`}
              placeholder="Enter section title"
              value={section.title}
              onChange={(e) =>
                handleSectionChange(index, "title", e.target.value)
              }
            />
            <Label htmlFor={`section-content-${index}`}>
              Section {index + 1} Content
            </Label>
            {section.content.map((content, contentIndex) => (
              <Textarea
                key={contentIndex}
                id={`section-content-${index}-${contentIndex}`}
                placeholder={`Enter section content ${contentIndex + 1}`}
                value={content}
                onChange={(e) =>
                  handleContentChange(index, contentIndex, e.target.value)
                }
              />
            ))}
            <Button onClick={() => addContent(index)}>
              Add Content
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addSection}>
          Add Section
        </Button>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image-1">Image 1</Label>
            <Input ref={image1Ref} id="image-1" required type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image-2">Image 2</Label>
            <Input ref={image2Ref} id="image-2" required type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image-3">Image 3</Label>
            <Input ref={image3Ref} id="image-3" required type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image-4">Image 4</Label>
            <Input ref={image4ref} id="image-4" required type="file" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleFormSubmit} type="submit">
            Publish
          </Button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
