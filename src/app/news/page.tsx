"use client";

import { useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Newspaper,
  BookOpen,
  Filter,
  ChevronRight,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";

// export const metadata: Metadata = {
//   title: "News & Updates",
//   description: "Stay informed with the latest news, updates, and stories from the Kashmiri Group of North America community.",
// };

type NewsCategory = "all" | "community" | "events" | "culture" | "announcements" | "stories";

type NewsArticle = {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: NewsCategory;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
};

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "KGNA Hosts Successful Annual Cultural Festival 2024",
    excerpt: "Over 2,000 community members gathered to celebrate Kashmiri heritage with traditional music, dance, and cuisine at our flagship event.",
    category: "events",
    author: "Sarah Ahmed",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: PLACEHOLDER_IMAGES.culturalEvent,
    featured: true,
    tags: ["Festival", "Culture", "Community"]
  },
  {
    id: 2,
    title: "New Kashmiri Language Program Launches for Youth",
    excerpt: "KGNA introduces comprehensive language learning program aimed at preserving Kashmiri language among younger generations.",
    category: "announcements",
    author: "Dr. Rashid Khan",
    date: "December 10, 2024",
    readTime: "3 min read",
    image: PLACEHOLDER_IMAGES.community,
    tags: ["Education", "Youth", "Language"]
  },
  {
    id: 3,
    title: "Community Spotlight: Meet Our Volunteer of the Year",
    excerpt: "Recognizing the exceptional contributions of Fatima Sheikh, who has dedicated over 500 hours to community service.",
    category: "stories",
    author: "Admin",
    date: "December 5, 2024",
    readTime: "4 min read",
    image: PLACEHOLDER_IMAGES.team,
    featured: true,
    tags: ["Volunteers", "Recognition", "Community"]
  },
  {
    id: 4,
    title: "Traditional Wazwan Cooking Workshop Great Success",
    excerpt: "Master chefs share secrets of authentic Kashmiri cuisine in sold-out workshop series.",
    category: "culture",
    author: "Amina Malik",
    date: "November 28, 2024",
    readTime: "6 min read",
    image: PLACEHOLDER_IMAGES.food,
    tags: ["Food", "Culture", "Workshop"]
  },
  {
    id: 5,
    title: "KGNA Scholarship Program Awards 10 Students",
    excerpt: "Annual scholarship program recognizes outstanding Kashmiri-American students pursuing higher education.",
    category: "announcements",
    author: "Board of Directors",
    date: "November 20, 2024",
    readTime: "4 min read",
    image: PLACEHOLDER_IMAGES.community,
    tags: ["Education", "Scholarship", "Youth"]
  },
  {
    id: 6,
    title: "Photo Exhibition Showcases Kashmir's Natural Beauty",
    excerpt: "Local photographers display stunning captures of Kashmir's landscapes in month-long exhibition.",
    category: "culture",
    author: "Tariq Shah",
    date: "November 15, 2024",
    readTime: "3 min read",
    image: PLACEHOLDER_IMAGES.kashmir1,
    tags: ["Photography", "Art", "Exhibition"]
  },
  {
    id: 7,
    title: "Community Iftar Brings Together 500+ Members",
    excerpt: "Annual Ramadan gathering strengthens community bonds with traditional iftar and prayers.",
    category: "community",
    author: "Islamic Committee",
    date: "November 10, 2024",
    readTime: "4 min read",
    image: PLACEHOLDER_IMAGES.community,
    tags: ["Ramadan", "Community", "Religion"]
  },
  {
    id: 8,
    title: "Youth Leadership Summit Inspires Next Generation",
    excerpt: "30 young Kashmiri-Americans participate in leadership development and cultural identity workshop.",
    category: "events",
    author: "Youth Committee",
    date: "November 5, 2024",
    readTime: "5 min read",
    image: PLACEHOLDER_IMAGES.team,
    tags: ["Youth", "Leadership", "Workshop"]
  },
  {
    id: 9,
    title: "KGNA Partners with Local Museums for Heritage Month",
    excerpt: "Collaboration brings Kashmiri art and artifacts to mainstream American museums.",
    category: "culture",
    author: "Cultural Affairs",
    date: "October 30, 2024",
    readTime: "4 min read",
    image: PLACEHOLDER_IMAGES.tradition,
    tags: ["Partnership", "Museum", "Heritage"]
  }
];

const categoryData = [
  { value: "all", label: "All News", icon: Newspaper },
  { value: "community", label: "Community", icon: User },
  { value: "events", label: "Events", icon: Calendar },
  { value: "culture", label: "Culture", icon: BookOpen },
  { value: "announcements", label: "Announcements", icon: TrendingUp },
  { value: "stories", label: "Stories", icon: BookOpen }
];

const popularTags = [
  "Community", "Culture", "Events", "Youth", "Education",
  "Festival", "Workshop", "Heritage", "Volunteers", "Scholarship"
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = newsArticles.filter(article => article.featured);
  const recentArticles = filteredArticles.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-4"
            >
              News & Updates
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Stay informed with the latest stories, announcements, and updates from our community
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news, events, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticles.length > 0 && !searchQuery && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-serif font-bold mb-6">Featured Story</h2>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={featuredArticles[0].image}
                      alt={featuredArticles[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="default">{featuredArticles[0].category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {featuredArticles[0].date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-3">
                      {featuredArticles[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {featuredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredArticles[0].author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredArticles[0].readTime}
                        </div>
                      </div>
                    </div>
                    <Button className="group">
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Categories */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categoryData.map((category) => {
                      const Icon = category.icon;
                      const count = category.value === "all"
                        ? newsArticles.length
                        : newsArticles.filter(a => a.category === category.value).length;
                      return (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value as NewsCategory)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                            selectedCategory === category.value
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{category.label}</span>
                          </div>
                          <Badge variant={selectedCategory === category.value ? "secondary" : "outline"}>
                            {count}
                          </Badge>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Popular Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setSearchQuery(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="mt-6 bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-lg">Stay Updated</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Get the latest news delivered to your inbox
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white text-black"
                    />
                    <Button variant="secondary" className="w-full">
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Articles Grid */}
              <div className="lg:col-span-3">
                {searchQuery && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredArticles.length} results for &quot;{searchQuery}&quot;
                      <Button
                        variant="link"
                        className="ml-2 p-0 h-auto"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear
                      </Button>
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-4 left-4">
                            {article.category}
                          </Badge>
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3" />
                            {article.date}
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </div>
                          <CardTitle className="text-xl line-clamp-2">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {article.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" className="group">
                            Read More
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredArticles.length === 0 && (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No articles found matching your criteria.
                    </p>
                  </Card>
                )}

                {/* Load More */}
                {filteredArticles.length > 6 && (
                  <div className="mt-8 text-center">
                    <Button size="lg" variant="outline">
                      Load More Articles
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">
              News Archive
            </h2>
            <p className="text-muted-foreground mb-6">
              Looking for older news? Browse our complete archive of past articles and updates.
            </p>
            <Button variant="outline">
              View Archive
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}